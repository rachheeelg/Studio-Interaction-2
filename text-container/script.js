const dialog = document.getElementById('my-dialog');
const closeBtn = document.getElementById('close-dialog');

window.addEventListener('load', () => {
  dialog.showModal();
});

closeBtn.addEventListener('click', () => {
  dialog.close();
});

const texts = {
  p1: `I live alone in a fourth-floor apartment on Belgrano Street, in Buenos Aires.\nLate one evening, a few months back, I heard a knock at my door.`,
  p2: `Dressed in gray and carrying a gray suitcase in his hand, he had an unassuming look about him. I saw at once that he was a foreigner. At first, he struck me as old; only later did I realize that I had been misled by his thin blond hair, which was, in a Scandinavian sort of way, almost white. During the course of our conversation, which was not to last an hour, I found out that he came from the Orkneys.`,
  p3: `I invited him in, pointing to a chair. He paused awhile before speaking. A kind of gloom emanated from him—as it does now from me.`,
  p4: `[i]"I sell Bibles," he said.[/i]\nSomewhat pedantically, I replied, "In this house are several English Bibles, including the first—John Wiclif's.I also have Cipriano de Valera's, Luther's—which, from a literary viewpoint, is the worst—and a Latin copy of the Vulgate. As you see, it's not exactly Bibles I stand in need of." After a few moments of silence, he said, "I don't only sell Bibles. I can show you a holy book I came across on the outskirts of Bikaner. \nIt may interest you."`,
  p5: `He opened the suitcase and laid the book on a table. It was an octavo volume, bound in cloth. There was no doubt that it had passed through many hands. Examining it, I was surprised by its unusual weight.`,
  p6: `On the spine were the words “Holy Writ” and, below them, “Bombay. Nineteenth  century,  probably,"  I  remarked.`,
  p7: `"I  don't  know,"  he  said.  "I've  never  found  out.",`
};

function buildLines(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';

  const chunks = text.split('\n');

  chunks.forEach((chunk, chunkIndex) => {
    const sentences = chunk.match(/[^.!?]+[.!?"]+\s*/g) || [chunk];

    sentences.forEach((sentence, sentIndex) => {
      const span = document.createElement('span');
      span.className = 'line';

      if (chunkIndex > 0 && sentIndex === 0) {
        span.style.display = 'block';
      }

      const formatted = sentence
        .replace(/\[i\]/g, '<em>')
        .replace(/\[\/i\]/g, '</em>');

      span.innerHTML = formatted;
      el.appendChild(span);
    });
  });
}

Object.entries(texts).forEach(([id, text]) => buildLines(id, text));

const sections = document.querySelectorAll('.stair-section');

function onScroll() {
  sections.forEach(section => {
    const rect     = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const raw      = 1 - (rect.bottom / (sectionH + window.innerHeight));
    const progress = Math.min(1, Math.max(0, raw));

    const lines = section.querySelectorAll('.line');
    const totalLines = lines.length;

    lines.forEach((line, i) => {
      const threshold = i / totalLines;
      if (progress >= threshold) {
        line.classList.add('in');
      } else {
        line.classList.remove('in');
      }
    });
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


