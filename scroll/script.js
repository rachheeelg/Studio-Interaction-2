const passages = [
  {
    text: `I opened the book at random. The script was strange to me. The pages, which were worn and typographically poor, were laid out in double columns, as in a Bible. The text was closely printed and ordered in versicles. In the upper corners of the pages were Arabic numbers. I noticed that one left-hand page bore the number (let us say) 40,514, and the facing right-hand page 999. I turned the leaf. It was numbered with eight digits. It also bore a small illustration, like the kind used in dictionaries: an anchor drawn with pen and ink, as if by a schoolboy's clumsy hand.`
  },
  {
    text: `It was at this point that the stranger said, "Look at the illustration closely. You'll never see it again." I noted my place and closed the book. At once, I reopened it. Page by page, in vain, I looked for the illustration of the anchor. "It seems to be a version of Scriptures in some Indian language, is it not?" I said, to hide my dismay.`
  },
  {
    text: `"No," he replied. Then, as if confiding a secret, he lowered his voice. "I acquired the book in a town out on the plain in exchange for a handful of rupees and a Bible. Its owner did not know how to read. I suspect that he saw the Book of Books as a talisman. He was of the lowest caste; nobody but other untouchables could tread his shadow without contamination. He told me his book was called the Book of Sand, because neither the book nor the sand has any beginning or end."`
  },
  {
    text: `Then, as if he were thinking aloud, he said, "If space is infinite, we may be at any point in space. If time is infinite, we may be at any point in time." His speculations irritated me. "You are religious, no doubt?" I asked him. "Yes, I'm a Presbyterian. My conscience is clear. I am reasonably sure of not having cheated the native when I gave him the Word of God in exchange for his devilish book."`
  },
  {
    text: `I assured him that he had nothing to reproach himself for, and I asked if he were just passing through this part of the world. He replied that he planned to return to his country in a few days. It was then that I learned that he was a Scot from the Orkney Islands. I told him I had a great personal affection for Scotland, through my love of Stevenson and Hume. "You mean Stevenson and Robbie Burns," he corrected. While we spoke, I kept exploring the infinite book. With feigned indifference, I asked, "Do you intend to offer this curiosity to the British Museum?"`
  },
  {
    text: `"No. I'm offering it to you," he said, and he stipulated a rather high sum for the book. I answered, in all truthfulness, that such a sum was out of my reach, and I began thinking. After a minute or two, I came up with a scheme. "I propose a swap," I said. "You got this book for a handful of rupees and a copy of the Bible. I'll offer you the amount of my pension check, which I've just collected, and my black-letter Wiclif Bible. I inherited it from my ancestors." "A black-letter Wiclif!" he murmured. I went to my bedroom and brought him the money and the book. He turned the leaves and studied the title page with all the fervor of a true bibliophile.`
  }
];

const container = document.getElementById('scroll-container');
const sentinel = document.getElementById('sentinel');

let cycleCount = 0;
let isLoading = false;

function addCycle() {
  if (isLoading) return;
  isLoading = true;

  cycleCount++;

  const shuffled = [...passages].sort(() => Math.random() - 0.5);

  shuffled.forEach((passage, i) => {
    const block = document.createElement('div');
    block.className = 'passage';

    block.innerHTML = `
      <p>${passage.text}</p>
    `;

    container.appendChild(block);

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => block.classList.add('visible'));
      });
    }, i * 80);
  });

  container.appendChild(sentinel);

  setTimeout(() => {
    isLoading = false;
    observer.unobserve(sentinel);
    observer.observe(sentinel);
  }, 600);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      addCycle();
    }
  });
}, {
  rootMargin: '400px'
});

observer.observe(sentinel);

const popupBtn = document.getElementById('popup-btn');
let scrollTimer = null;
let popupShown = false;

window.addEventListener('scroll', () => {
  if (popupShown) return;

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    popupBtn.classList.add('visible');
    popupShown = true;
  }, 1000);
}, { passive: true });

addCycle();