setTimeout(() => {
  const carouselItems = document
    .getElementById("q-we40qm6")
    .querySelectorAll(".vf-q-choice");
  const elems = Array.from(carouselItems);
  var current = 0;

  const updateCarousel = function (direct) {
    elems.forEach((item) => {
      const currentPos = parseInt(item.dataset.pos);

      item.dataset.pos = getPos(currentPos, direct, elems.length);
    });
    current = 0;
  };

  const getPos = function (current, direct, total) {
    const halfTotal = Math.floor(total / 2);
    const newpos = ((current + direct + halfTotal + total) % total) - halfTotal;
    return newpos;
  };

  const ctrlsElement = document.createElement("div");
  ctrlsElement.className = "vf-carousel-ctrls";

  //create button element
  const prevButton = document.createElement("button");
  prevButton.id = "vf-prev-btn";
  prevButton.textContent = "❮";
  prevButton.addEventListener("click", () => {
    updateCarousel(-1);
  });
  prevButton.tabIndex = 0;
  prevButton.ariaLabel = "Previous Slide";
  document.getElementById("q-we40qm6").getElementsByClassName("vf-q-input")[0].appendChild(prevButton);

  //create carousel-ctrls  element
  const nextButton = document.createElement("button");
  nextButton.id = "vf-next-btn";
  nextButton.textContent = "❯";
  nextButton.addEventListener("click", () => {
    updateCarousel(1);
  });
  nextButton.tabIndex = 0;
  nextButton.ariaLabel = "Next Slide";
  document.getElementById("q-we40qm6").getElementsByClassName("vf-q-input")[0].appendChild(nextButton);

  (() =>
    elems.forEach((item, index) => {
      item.dataset.pos = index - Math.floor(elems.length / 2);
    }))();

}, 250);


setTimeout(() => {
  const carouselItems = document
    .getElementById("q-we40qm6")
    .querySelectorAll(".vf-q-choice");
  const elems = Array.from(carouselItems);
  var startX = 0;
  var isDragging = false;

  const updateCarousel = function (direct) {
    elems.forEach((item) => {
      const currentPos = parseInt(item.dataset.pos);
      item.dataset.pos = getPos(currentPos, direct, elems.length);
    });
  };

  const getPos = function (current, direct, total) {
    const halfTotal = Math.floor(total / 2);
    const newpos = ((current + direct + halfTotal + total) % total) - halfTotal;
    return newpos;
  };

  // Create previous button
  const prevButton = document.createElement("button");
  prevButton.id = "vf-prev-btn";
  prevButton.textContent = "❮";
  prevButton.addEventListener("click", () => {
    updateCarousel(1); // Move right
  });
  prevButton.tabIndex = 0;
  prevButton.ariaLabel = "Previous Slide";
  document.getElementById("q-we40qm6").getElementsByClassName("vf-q-input")[0].appendChild(prevButton);

  // Create next button
  const nextButton = document.createElement("button");
  nextButton.id = "vf-next-btn";
  nextButton.textContent = "❯";
  nextButton.addEventListener("click", () => {
    updateCarousel(-1); // Move left
  });
  nextButton.tabIndex = 0;
  nextButton.ariaLabel = "Next Slide";
  document.getElementById("q-we40qm6").getElementsByClassName("vf-q-input")[0].appendChild(nextButton);

  (() =>
    elems.forEach((item, index) => {
      item.dataset.pos = index - Math.floor(elems.length / 2);
    }))();

  // Handle swipe events
  const onTouchStart = (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - startX;
    if (Math.abs(diffX) > 50) {
      updateCarousel(diffX > 0 ? -1 : 1); // Inverted swipe direction
      isDragging = false;
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  document.getElementById("q-we40qm6").addEventListener("touchstart", onTouchStart);
  document.getElementById("q-we40qm6").addEventListener("touchmove", onTouchMove);
  document.getElementById("q-we40qm6").addEventListener("touchend", onTouchEnd);

  // Handle mouse drag events for desktop
  const onMouseDown = (e) => {
    startX = e.clientX;
    isDragging = true;
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    if (Math.abs(diffX) > 50) {
      updateCarousel(diffX < 0 ? -1 : 1); // Inverted swipe direction
      isDragging = false;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  document.getElementById("q-we40qm6").addEventListener("mousedown", onMouseDown);
  document.getElementById("q-we40qm6").addEventListener("mousemove", onMouseMove);
  document.getElementById("q-we40qm6").addEventListener("mouseup", onMouseUp);
}, 250);