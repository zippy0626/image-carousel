const imageCarousel = document.querySelector(".image-carousel");
const navRight = document.querySelector(".nav-right");
const navLeft = document.querySelector(".nav-left");

let imageElements = Array.from(imageCarousel.children);
let imageWidth = Math.ceil(100 / imageElements.length);

//add first image to end
const firstImageClone = imageElements[0].cloneNode(true);
imageCarousel.append(firstImageClone);
firstImageClone.style.left = `${68 + 34}%`;

//add last image to beginning
const lastImageClone = imageElements[2].cloneNode(true);
imageCarousel.prepend(lastImageClone);
lastImageClone.style.left = `-34%`;

// carousel size
imageCarousel.style.width = `
  ${imageElements.length * 100}%
`;

// We are moving the carousel itself, not the images.
let userclicked = false;
let index = 0;
navRight.addEventListener("click", () => {
  userclicked = true;
  index += 1;

  imageCarousel.style.transition = "all 350ms ease-in-out";
  imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;

  if (index === imageElements.length) {
    index = 0;
    setTimeout(() => {
      imageCarousel.style.transition = "none";
      imageCarousel.style.transform = `translateX(0)`;
    }, 350);
  }

  setTimeout(() => {
    userclicked = false;
  }, 4000);
});

navLeft.addEventListener("click", () => {
  userclicked = true;
  index -= 1;

  // Positive X going right
  imageCarousel.style.transition = "all 350ms ease-in-out";
  imageCarousel.style.transform = `translateX(${-index * imageWidth}%)`;

  if (index === -1) {
    index = 2;
    setTimeout(() => {
      imageCarousel.style.transition = "none";
      imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;
    }, 350);
  }

  setTimeout(() => {
    userclicked = false;
  }, 4000);
});

let interval;
function autoPan(delay) {
  if (userclicked) return;

  interval = setInterval(() => {
    if (userclicked) return;
    
    index += 1;
    imageCarousel.style.transition = "all 350ms ease-in-out";
    imageCarousel.style.transform = `translateX(-${index * imageWidth}%)`;

    //reset
    if (index === imageElements.length) {
      index = 0;
      setTimeout(() => {
        imageCarousel.style.transition = "none";
        imageCarousel.style.transform = `translateX(0)`;
      }, 350);
    }
  }, delay);
}

autoPan(5000);
