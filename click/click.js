const container = document.querySelector('.container');
const texts = [
  '"It\'s a deal," he said.',
  'It amazed me that he did not haggle. Only later was I to realize that he had entered<br>my house with his mind made up to sell the book. Without counting the money,<br> he put it away.',
  'We talked about India, about Orkney, and about the Norwegian jails that once ruled it. <br>It was night when the man left. I have not seen him again, nor do I know his name.',
  'I thought of keeping the Book of Sand in the space left on the shelf by the Wiclif, but in the end I decided to hide it behind the volumes of a broken set of The Thousand and One Nights. I went to bed and did not sleep. At three or four in the morning, I turned on the light. I got down the impossible book and leafed through its pages. On one of them I saw engraved a mask. The upper corner of the page carried a number, which I no longer recall, elevated to the ninth power.',
  'I showed no one my treasure. To the luck of owning it was added the fear of having it stolen, and then the misgiving that it might not truly be infinite. These twin preoccupations intensified my old misanthropy. I had only a few friends left; I now stopped seeing even them. A prisoner of the book, I almost never went out anymore. After studying its frayed spine and covers with a magnifying glass, I rejected the possibility of a contrivance of any sort. The small illustrations, I verified, came two thousand pages apart. I set about listing them alphabetically in a notebook, which I was not long in filling up. Never once was an illustration repeated. At night, in the meager intervals my insomnia granted, I dreamed of the book.',
  'Summer came and went, and I realized that the book was monstrous. What good did it do me to think that I, who looked upon the volume with my eyes, who held it in my hands, was any less monstrous? I felt that the book was a nightmarish object, an obscene thing that affronted and tainted reality itself.',
  'I thought of fire, but I feared that the burning of an infinite book might likewise prove infinite and suffocate the planet with smoke. Somewhere I recalled reading that the best place to hide a leaf is in a forest. Before retirement, I worked on Mexico Street at the Argentine National Library, which contains nine hundred thousand volumes. I knew that to the right of the entrance a curved staircase leads down into the basement, where books and maps and periodicals are kept. One day I went there and, slipping past a member of the staff and trying not to notice at what height or distance from the door, I lost the Book of Sand on one of the basement\'s musty shelves.',
];
let currentIndex = 0;

alert('Click to read through the page');

container.addEventListener('click', () => {
  console.log('Clicked! Current index:', currentIndex, 'Total texts:', texts.length);
  
  if (currentIndex >= texts.length) {
    console.log('Navigating to index.html');
    window.location.href = '../index.html';
    return;
  }
  
  container.innerHTML = texts[currentIndex]; 
  container.className = `container text-${currentIndex + 1}`;
  currentIndex++;
});

container.innerHTML = texts[0];
container.className = 'container text-1';
currentIndex = 1;