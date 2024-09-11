const carouselItems = document.querySelectorAll(".carousel__card");
const elems = Array.from(carouselItems);
var current = 0;

const updateCarousel = function (direct) {
  elems.forEach((item) => {
    const currentPos = parseInt(item.dataset.pos);

    
    item.dataset.pos = getPos(currentPos, direct, elems.length);  
  });
  current = 0;
};

const getPos = function(current, direct, total) {
  const halfTotal = Math.floor(total / 2);
  const newpos = (current + direct + halfTotal + total) % total - halfTotal;
  return newpos;
}

document.getElementById("next").addEventListener("click", () => updateCarousel(1));

document.getElementById("prev").addEventListener("click", () => updateCarousel(-1));

(() =>   elems.forEach((item, index) => item.dataset.pos = index - Math.floor(elems.length / 2)))();
