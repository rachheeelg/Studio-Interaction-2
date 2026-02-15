(function () {
  'use strict';

  const SCROLL_WINDOW = 0.75;
  const STAGGER       = 0.18;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function easeOutCubic(t)  { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t)    { return a + (b - a) * t; }

  const paragraphs = Array.from(
    document.querySelectorAll('p.p1, p.p2, p.p3, p.p4, p.p5')
  );

  paragraphs.forEach(function(p) {
    const clean  = p.textContent.replace(/\s+/g, ' ').trim();
    const tokens = clean.split(' ');

    const html = tokens.map(function(token) {
      const letters = [...token].map(function(ch) {
        const safe = ch.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        return '<span class="letter">' + safe + '</span>';
      }).join('');
      return '<span class="word">' + letters + '</span>';
    }).join('');

    p.innerHTML = html;
    p._letters = Array.from(p.querySelectorAll('.letter'));
    p._words   = Array.from(p.querySelectorAll('.word'));
  });

  // Assign each letter a random scatter offset (position + rotation)
  paragraphs.forEach(function(p) {
    p._letters.forEach(function(l) {
      const tx = (Math.random() - 0.5) * window.innerWidth * 0.8;
      const ty = (Math.random() - 0.5) * 300;
      const rot = (Math.random() - 0.5) * 60;
      l.dataset.tx  = tx;
      l.dataset.ty  = ty;
      l.dataset.rot = rot;
    });
  });

  function computeSpacing(p) {
    const vw       = window.innerWidth;
    const fontSize = parseFloat(getComputedStyle(p).fontSize);
    const letters  = p._letters;
    const words    = p._words;
    const gapSlots = letters.length + words.length;

    if (!letters.length || !gapSlots) return { trackStart: 0.5, trackEnd: 0.02 };

    letters.forEach(function(l) {
      l.style.setProperty('--ls', '0em');
      l.style.setProperty('--op', '1');
      l.style.transform = '';
    });
    words.forEach(function(w) { w.style.setProperty('--ws', '0.25em'); });

    p.style.whiteSpace  = 'nowrap';
    p.style.width       = 'auto';
    p.style.marginLeft  = '0';
    p.style.marginRight = '0';

    void p.offsetWidth;
    const naturalWidth = p.scrollWidth;

    p.style.whiteSpace  = '';
    p.style.width       = '';
    p.style.marginLeft  = '';
    p.style.marginRight = '';

    void p.offsetWidth;
    const containerWidth = p.clientWidth;
    const endExtraPx     = Math.max(0, containerWidth - naturalWidth);
    const trackEnd       = (endExtraPx / gapSlots) / fontSize;

    const startExtraPx  = Math.max(0, vw - naturalWidth);
    const trackStart    = Math.max(trackEnd + 0.01, (startExtraPx / gapSlots) / fontSize);

    // Reset to scattered invisible state
    letters.forEach(function(l) {
      l.style.setProperty('--op', '0');
      l.style.transform = 'translate(' + l.dataset.tx + 'px, ' + l.dataset.ty + 'px) rotate(' + l.dataset.rot + 'deg)';
    });

    return { trackStart: trackStart, trackEnd: trackEnd };
  }

  paragraphs.forEach(function(p) {
    p._spacing = computeSpacing(p);
    p.style.whiteSpace  = 'nowrap';
    p.style.width       = '100vw';
    p.style.marginLeft  = '0';
    p.style.marginRight = '0';
    p.style.overflow    = 'visible';
    p.style.position    = 'relative';
  });

  const cue = document.createElement('div');
  cue.className = 'scroll-cue';
  cue.textContent = 'scroll';
  document.body.appendChild(cue);

  const spacer = document.createElement('div');
  spacer.className = 'end-space';
  document.body.appendChild(spacer);

  const collapsed = new Set();

  function update() {
    const vh = window.innerHeight;
    let anyVisible = false;

    paragraphs.forEach(function(p, idx) {
      const rect    = p.getBoundingClientRect();
      const letters = p._letters;
      const words   = p._words;
      const s       = p._spacing;

      const progress = clamp((vh - rect.top) / (vh * SCROLL_WINDOW), 0, 1);
      if (progress > 0) anyVisible = true;

      const paraT = easeOutCubic(progress);

      if (!collapsed.has(idx)) {
        const marginPct = 10;
        const curMargin = lerp(0, marginPct, paraT);
        const curWidth  = lerp(100, 80, paraT);
        p.style.marginLeft  = curMargin + '%';
        p.style.marginRight = curMargin + '%';
        p.style.width       = curWidth + 'vw';

        if (progress >= 1) {
          collapsed.add(idx);
          p.style.whiteSpace  = '';
          p.style.width       = '';
          p.style.marginLeft  = '';
          p.style.marginRight = '';
          p.style.overflow    = '';
          p.style.position    = '';
        }
      }

      letters.forEach(function(letter, i) {
        const raw = clamp(progress - (i / letters.length) * STAGGER, 0, 1);
        const t   = easeOutCubic(raw);

        // Interpolate from scattered position back to 0,0
        const tx  = parseFloat(letter.dataset.tx)  * (1 - t);
        const ty  = parseFloat(letter.dataset.ty)  * (1 - t);
        const rot = parseFloat(letter.dataset.rot) * (1 - t);

        letter.style.setProperty('--ls', lerp(s.trackStart, s.trackEnd, t).toFixed(4) + 'em');
        letter.style.setProperty('--op', t.toFixed(4));
        letter.style.transform = 'translate(' + tx.toFixed(2) + 'px, ' + ty.toFixed(2) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
        letter.style.transition = 'opacity 0.6s ease, letter-spacing 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
      });

      words.forEach(function(word) {
        word.style.setProperty('--ws', lerp(s.trackStart, s.trackEnd, paraT).toFixed(4) + 'em');
      });
    });

    cue.classList.toggle('hidden', anyVisible);
  }

  function onResize() {
    collapsed.clear();
    paragraphs.forEach(function(p) {
      p._letters.forEach(function(l) {
        const tx = (Math.random() - 0.5) * window.innerWidth * 0.8;
        const ty = (Math.random() - 0.5) * 300;
        const rot = (Math.random() - 0.5) * 60;
        l.dataset.tx  = tx;
        l.dataset.ty  = ty;
        l.dataset.rot = rot;
      });
      p.style.whiteSpace  = 'nowrap';
      p.style.width       = '100vw';
      p.style.marginLeft  = '0';
      p.style.marginRight = '0';
      p.style.overflow    = 'visible';
      p.style.position    = 'relative';
      p._spacing = computeSpacing(p);
    });
    update();
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  update();

})();