const imageCarousel = document.querySelector(".image-carousel");
const navRight = document.querySelector(".nav-right");
const navLeft = document.querySelector(".nav-left");

let imageElements = Array.from(imageCarousel.children);
let imageWidth = Math.ceil(100 / imageElements.length);

// add first image to end
const firstImageClone = imageElements[0].cloneNode(true);
imageCarousel.append(firstImageClone);
firstImageClone.style.left = `${68 + 34}%`;

// add last image to beginning
const lastImageClone = imageElements[2].cloneNode(true);
imageCarousel.prepend(lastImageClone);
lastImageClone.style.left = `-34%`;

// carousel size
imageCarousel.style.width = `
  ${imageElements.length * 100}%
`;

// Dot Functionality
function initDots() {
  const imageNavDotContainer = document.querySelector(".image-navigation-dots");
  let i = 0;
  for (const element of imageElements) {
    const dot = document.createElement('div');
    dot.className = `dot i-${i}`
    imageNavDotContainer.appendChild(dot);
    i+=1;
  }
}
initDots();

function updateDot(index) {
  const imageNavDotContainer = document.querySelector(".image-navigation-dots");
  for (const dot of imageNavDotContainer.children) {
    dot.style.backgroundColor = `hsl(0, 0%, 90%)`;
  }

  const currentDot = imageNavDotContainer.children[index];
  currentDot.style.backgroundColor = `hsl(0, 0%, 70%)`;
}

// autopan object
const autoPan = {
  interval: null,

  startAutoPan(delay) {
    this.interval = setInterval(() => {
      index += 1;
      if (index < imageElements.length) updateDot(index);

      imageCarousel.style.transition = "all 350ms ease-in-out";
      imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;

      if (index === imageElements.length) {
        index = 0;
        updateDot(index);

        setTimeout(() => {
          imageCarousel.style.transition = "none";
          imageCarousel.style.transform = `translateX(0)`;
        }, 350);
      }
    }, delay);
  },

  stopAutoPan() {
    clearInterval(this.interval);
    this.interval = null;
  },
};

// Flags
let index = 0;
let isTransitioning = false;

updateDot(index);
autoPan.startAutoPan(5000);

navRight.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;

  autoPan.stopAutoPan();

  index += 1;
  if (index < imageElements.length) updateDot(index);

  //going negative/right
  imageCarousel.style.transition = "all 350ms ease-in-out";
  imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;

  //last image
  if (index === imageElements.length) {
    index = 0;
    updateDot(index);

    setTimeout(() => {
      imageCarousel.style.transition = "none";
      imageCarousel.style.transform = `translateX(0)`;

      isTransitioning = false;
      autoPan.startAutoPan(5000);
    }, 350);
  } else {
    setTimeout(() => {
      isTransitioning = false;
      autoPan.startAutoPan(5000);
    }, 350);
  }
});

navLeft.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;

  autoPan.stopAutoPan();

  index -= 1;
  if (index >= 0) updateDot(index);

  // going positive/left
  imageCarousel.style.transition = "all 350ms ease-in-out";
  imageCarousel.style.transform = `translateX(${-index * imageWidth}%)`;

  if (index === -1) {
    index = 2;
    updateDot(index);

    setTimeout(() => {
      imageCarousel.style.transition = "none";
      imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;

      isTransitioning = false;
      autoPan.startAutoPan(5000);
    }, 350);
  } else {
    setTimeout(() => {
      isTransitioning = false;
      autoPan.startAutoPan(5000);
    }, 350);
  }
});

// Handle User dot click

function panToIndex(index) {
  
}

function handleDotClicks() {
  const imageNavDotContainer = document.querySelector(".image-navigation-dots");

  imageNavDotContainer.addEventListener('click', (e)=>{
    const target = e.target.classList.contains("dot")
      ? e.target
      : null

    if (target) {
      const dotIndex = parseInt(target.className.split("i-")[1]);
      updateDot(dotIndex);
    }
  });
}
handleDotClicks();