const hoverWords = document.querySelectorAll('.hover-word');
const imagePopup = document.getElementById('image-popup');
const popupImg = imagePopup.querySelector('img');

hoverWords.forEach(word => {
    word.addEventListener('mouseenter', (e) => {
        const imageSrc = e.target.dataset.image;
        popupImg.src = imageSrc;
        imagePopup.classList.add('show');
    });
    
    word.addEventListener('mousemove', (e) => {
        imagePopup.style.left = e.clientX + 20 + 'px';
        imagePopup.style.top = e.clientY + 20 + 'px';
    });
    
    word.addEventListener('mouseleave', () => {
        imagePopup.classList.remove('show');
    });
});

