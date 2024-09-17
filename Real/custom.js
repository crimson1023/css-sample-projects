(() => {
  const controlCarousel = (contianerId, carouselType) => {
    const container = document.getElementById(contianerId);
    const carouselItems = container.querySelectorAll(".vf-q-choice");
    const bgElement = document.createElement("div");
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    const elems = Array.from(carouselItems);

    var startX = 0;
    var isDragging = false;

    const updateCarousel = function (direct) {
      elems.forEach((item) => {
        const currentPos = parseInt(item.dataset.pos);
        const newPos = getPos(currentPos, direct, elems.length);
        item.dataset.pos = newPos;

        if (newPos !== 0) return;

        updateBackground(item);
      });
    };

    const updateBackground = (activeItem) => {
      const imgUrl = activeItem
        .getElementsByTagName("img")[0]
        .getAttribute("src");
      bgElement.style.backgroundImage = `url(${imgUrl})`;
    };

    const getPos = function (current, direct, total) {
      const halfTotal = Math.floor(total / 2);
      const newpos =
        ((current + direct + halfTotal + total) % total) - halfTotal;
      return newpos;
    };

    // Handle swipe events
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const diffX = e.touches[0].clientX - startX;

      if (Math.abs(diffX) < 50) return;
      updateCarousel(diffX > 0 ? -1 : 1); // Inverted swipe direction
      isDragging = false;
    };

    const onTouchEnd = () => (isDragging = false);

    // Handle mouse drag events for desktop
    const onMouseDown = (e) => {
      startX = e.clientX;
      isDragging = true;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const diffX = e.clientX - startX;

      if (Math.abs(diffX) < 50) return;
      updateCarousel(diffX < 0 ? -1 : 1); // Inverted swipe direction
      isDragging = false;
    };

    const onMouseUp = () => (isDragging = false);

    const createNavigations = () => {
      // create carousel navigation buttons

      prevButton.id = "vf-prev-btn";
      nextButton.id = "vf-next-btn";
      prevButton.textContent = "❮";
      nextButton.textContent = "❯";

      container.getElementsByClassName("vf-q-input")[0].appendChild(prevButton);
      container.getElementsByClassName("vf-q-input")[0].appendChild(nextButton);
    };

    const createBackground = () => {
      bgElement.className = "vf-background";
      container.insertBefore(bgElement, container.firstChild);
      elems.forEach((item, index) => {
        if (item.dataset.pos == 0) updateBackground(item);
      });
    };

    const initEventLister = () => {
      nextButton.addEventListener("click", () => updateCarousel(-1));
      prevButton.addEventListener("click", () => updateCarousel(1));

      container.addEventListener("touchstart", onTouchStart);
      container.addEventListener("touchmove", onTouchMove);
      container.addEventListener("touchend", onTouchEnd);

      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseup", onMouseUp);
    };

    const carouselClassName = (_carouselType) => {
      switch (_carouselType) {
        case "3D":
          return "vf-c-3d";
        case "OCTAGON":
          return "vf-c-octagon";

        default:
          break;
      }
    };
    const init = () => {
      container.classList.add(carouselClassName(carouselType));
      //init  carousel card data-pos
      elems.forEach(
        (item, index) =>
          (item.dataset.pos = index - Math.floor(elems.length / 2))
      );

      createBackground();
      createNavigations();
      initEventLister();
    };

    init();
  };

  setTimeout(() => {
    controlCarousel("q-we40qm6", "3D");
    controlCarousel("q-u4wxh3p", "OCTAGON");
    controlCarousel("q-u5cud6n", "OCTAGON");
    controlCarousel("q-ja59mdb", "OCTAGON");
    controlCarousel("q-tqcwcnz", "OCTAGON");
    controlCarousel("q-17ibijzz", "OCTAGON");
    controlCarousel("q-189atjq7", "OCTAGON");
    controlCarousel("q-we6j6w5", "OCTAGON");
    controlCarousel("q-15klcwf3", "OCTAGON");
  }, 250);
})();
