
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function showSlides(n) {
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex].style.display = 'block';
}

function changeSlide(n) {
  showSlides(slideIndex += n);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
  setInterval(() => {
    changeSlide(1);
  }, 15000); // Change slide every 5 seconds
});
