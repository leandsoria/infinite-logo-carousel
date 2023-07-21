let CARD_TRANSITION_SPEED = 2; // how much time it takes per picture to scroll

const root = document.documentElement;
const mainContainer = document.querySelector(".carousel");
const carouselContainer = document.querySelectorAll(".card-container");
let carouselSlider = document.querySelectorAll(".carousel-container");
let carouselImage = document.querySelectorAll(".card-container .img");
let carouselImageSize = carouselContainer[0].clientWidth;
let amountOfImages = carouselImage.length;
let totalImagesWidth = carouselImageSize * amountOfImages;
let viewportSize = document.documentElement.clientWidth;

/* CREATE CLONES CONTAINERS */
const createClone = () => {
  const newClone = carouselSlider[0].cloneNode(true);
  newClone.classList.add("cloned-container");
  carouselSlider[0].after(newClone);
};
/* REMOVE CLONE FUNCTION  */
const removeClone = () => {
  const clonedContainers = document.querySelectorAll(".cloned-container");
  console.log(clonedContainers);
  clonedContainers.forEach((container) => container.remove());
};

/* SET CAROUSEL SPEED */
const getAnimationDuration = () => {
  const totalAnimationDuration = CARD_TRANSITION_SPEED * amountOfImages;
  return totalAnimationDuration;
};
/* Calculate total images Width */
const getTotalAmountImageWidth = () => {
  carouselImage = document.querySelectorAll(".card-container .img");
  amountOfImages = carouselImage.length;
  totalImagesWidth = carouselImageSize * amountOfImages;
  viewportSize = document.documentElement.clientWidth;
};

/* Reset animation */
const resetAnimation = () => {
  carouselSlider = document.querySelectorAll(".carousel-container");
  carouselSlider.forEach((car) => {
    car.style.animation = "none";
    car.offsetHeight;
    car.style.animation = null;
  });
};

/* Create clones according to the viewport */
const calculateAmountOfClones = () => {
  const clonedContainers = document.querySelectorAll(".cloned-container");
  if (totalImagesWidth < viewportSize) {
    let amountContainersToClone = Math.ceil(viewportSize / totalImagesWidth);
    for (i = 0; i <= amountContainersToClone; i++) {
      createClone();
    }
  }
  if (totalImagesWidth >= viewportSize && clonedContainers.length === 0) {
    createClone();
  }
};

window.addEventListener("resize", () => {
  getTotalAmountImageWidth();
  resetAnimation();
  calculateAmountOfClones();
});
/* SET STYLES  */
calculateAmountOfClones();
const finalAnimationDuration = getAnimationDuration();
root.style.setProperty("--animation-duration", finalAnimationDuration + "s");
