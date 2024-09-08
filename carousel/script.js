// script.js
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
const itemsVisible = Math.round(document.querySelector('.carousel').offsetWidth / slides[0].offsetWidth);

function showSlide(index) {
  if (index >= slides.length - itemsVisible + 1) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - itemsVisible;
  } else {
    currentIndex = index;
  }

  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100 / itemsVisible}%)`;
  updateDots();
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function currentSlide(index) {
  showSlide(index);
}

function updateDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < Math.ceil(slides.length / itemsVisible); i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === currentIndex) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => currentSlide(i));
    dotsContainer.appendChild(dot);
  }
}

let autoSlide = setInterval(nextSlide, 3000);

document.querySelector('.carousel').addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 3000);
});

// Initialize
showSlide(currentIndex);
