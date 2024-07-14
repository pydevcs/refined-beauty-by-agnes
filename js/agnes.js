function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    //console.log(e.target.textContent);
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

/* slider */
let currentIndex = 0;

function updateArrows() {
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const slides = document.querySelector('.slides');
  const totalImages = slides.querySelectorAll('img').length;

  if (currentIndex <= 0) {
    leftArrow.classList.add('disabled');
  } else {
    leftArrow.classList.remove('disabled');
  }

  if (currentIndex >= totalImages - 2) {
    rightArrow.classList.add('disabled');
  } else {
    rightArrow.classList.remove('disabled');
  }
}

function moveLeft() {
  const slides = document.querySelector('.slides');
  if (currentIndex > 0) {
    currentIndex--;
    slides.style.transform = `translateX(-${currentIndex * 50}%)`;
    updateArrows();
  }
}

function moveRight() {
  const slides = document.querySelector('.slides');
  const totalImages = slides.querySelectorAll('img').length;
  if (currentIndex < totalImages - 2) {
    currentIndex++;
    slides.style.transform = `translateX(-${currentIndex * 50}%)`;
    updateArrows();
  }
}

// Initialize the arrows state on page load
document.addEventListener('DOMContentLoaded', () => {
  updateArrows();
});
/* end slider */