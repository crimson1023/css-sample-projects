const state = {};
const carouselList = document.querySelector(".carousel__list");
const carouselItems = document.querySelectorAll(".carousel__item");
const elems = Array.from(carouselItems);

carouselList.addEventListener("click", function (event) {
  var newActive = event.target.parentNode;
  var isItem = newActive.closest(".carousel__item");

  if (!isItem || newActive.classList.contains("carousel__item_active")) {
    return;
  }

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = parseInt(newActive.dataset.pos); // Parse position as integer

  const totalItems = elems.length; // Total number of carousel items

  // Update each element's position in the cycle
  elems.forEach((item) => {
    const currentPos = parseInt(item.dataset.pos);
    const newPos = getPos(currentPos, newActivePos, totalItems);
    item.dataset.pos = newPos;
  });
};

// Calculate new position for each element
const getPos = function (current, active, totalItems) {
  const diff = current - active;

  // Use modulo to loop through all images
  if (diff < -Math.floor(totalItems / 2)) {
    return totalItems + diff;
  } else if (diff > Math.floor(totalItems / 2)) {
    return diff - totalItems;
  }

  return diff;
};
