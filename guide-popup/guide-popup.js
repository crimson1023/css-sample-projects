class GuideContainer {
  constructor(bubbleStyle, popupStyle, container) {
    this.guideContainer = container;

    this.ripple = this.ele(".ripple-container");
    this.popup = this.ele(".guide-popup");
    this.content = this.ele(".guide-content");
    this.hLine = this.ele(".horizontal");
    this.vLine = this.ele(".vertical");

    this.setRippleStyle(bubbleStyle);
    this.setGuideStyle(popupStyle);
    this.updateConnectingLines();
  }

  ele(query) {
    return this.guideContainer.querySelector(query);
  }

  updateConnectingLines() {
    const rippleRect = this.ripple.getBoundingClientRect();
    const popupRect = this.content.getBoundingClientRect();

    const rippleCenterX = rippleRect.left + rippleRect.width / 2;
    const rippleCenterY = rippleRect.top + rippleRect.height / 2;

    const popupCenterX = popupRect.left + popupRect.width / 2;
    const popupCenterY = popupRect.top + popupRect.height / 2;

    this.hLine.style.top = `${rippleCenterY}px`;
    this.hLine.style.left = `${Math.min(rippleCenterX, popupCenterX)}px`;
    this.hLine.style.width = `${Math.abs(popupCenterX - rippleCenterX)}px`;

    this.vLine.style.left = `${popupCenterX}px`;
    this.vLine.style.top = `${Math.min(rippleCenterY, popupCenterY)}px`;
    this.vLine.style.height = `${Math.abs(popupCenterY - rippleCenterY)}px`;
  }
  show(visible) {
    if (this.guideContainer === undefined) return;
    this.guideContainer.style.display = visible ? "block" : "none";
  }

  showContent(visible, callback) {
    if (this.popup === undefined) return;
    this.popup.style.display = visible ? "block" : "none";
    if (visible) this.updateConnectingLines();
    if (callback) callback();
  }

  setRippleStyle({ radius, left, right, top, bottom }) {
    if (this.ripple === undefined) return;
    this.ripple.style.width = `${radius * 2}px`;
    this.ripple.style.height = `${radius * 2}px`;
    this.ripple.style.left = `${left}px`;
    this.ripple.style.right = `${right}px`;
    this.ripple.style.top = `${top}px`;
    this.ripple.style.bottom = `${bottom}px`;
  }

  setGuideStyle({ left, right, top, bottom, width, height, text }) {
    if (this.content === undefined) return;
    this.content.style.width = `${width}px`;
    this.content.style.height = `${height}px`;
    this.content.style.left = `${left}px`;
    this.content.style.right = `${right}px`;
    this.content.style.top = `${top}px`;
    this.content.style.bottom = `${bottom}px`;
    this.content.innerHTML = text;
  }
}

const guiderContainer = document.querySelector(".guide-container");

const bubbleStyle1 = {
  radius: 10,
  left: 50,
  top: 50,
};
const popupStyle1 = {
  text: "Nice. When clicking this button your can ccon.....",
  width: 200,
  left: 200,
  top: 150,
};

const g = new GuideContainer(bubbleStyle1, popupStyle1, guiderContainer);

const guiderContainer2 = document.querySelector(".guide-container2");

const bubbleStyle2 = {
  radius: 10,
  left: 50,
  top: 50,
};
const popupStyle2 = {
  text: "This will be removed after 5 seconds.",
  width: 200,
  left: 200,
  top: 150,
};

const g2 = new GuideContainer(bubbleStyle2, popupStyle2, guiderContainer);
g2.show(false);
g.ripple.addEventListener("click", () =>
  g.showContent(true, () => {
    g2.showContent();
    setTimeout(() => {
      g2.show(true);
      g.show(false);
    }, 5000);

   
  })
);

g2.ripple.addEventListener("click", () => g2.showContent(true));
