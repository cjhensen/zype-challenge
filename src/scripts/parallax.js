/* ************************************************************
parallax.js
initializeParallax - setup the parallax items
isElementVisible - check if item is in viewport
updateParallax - trigger animation
updateImages - perform ui changes
************************************************************ */

// parallax image selector
const PARALLAX_IMG = '.parallax';
// image store for all parallax images
const images = [];
// counter to keep track of scroll
let lastScrollTop = 0;

// initializeParallax:
// for each parallax element on the page,
// create an object, set its element, height, transform amount, transform boundaries
// add to images array
function initializeParallax() {
  $(PARALLAX_IMG).each(function(index) {
    const parallaxImg = {};
    parallaxImg.element = $(this);
    parallaxImg.height = parallaxImg.element.height();
    parallaxImg.transformAmount = -25;
    parallaxImg.maxTransform = 25;
    parallaxImg.minTransform = -25

    images.push(parallaxImg);
  });
}

// isElementVisible:
// checks to see if the element is within the viewport. 
// boundaries for activating an image scroll begin at the top and bottom of the document,
// in the middle of the image.
function isElementVisible(element) {
  const documentTop = $(window).scrollTop();
  const documentBottom = documentTop + $(window).height();

  const elementTop = element.offset().top;
  const elementBottom = elementTop + element.height();
  const elementMiddle = elementBottom - (element.height() / 2);

  return (elementMiddle <= documentBottom && elementMiddle >= documentTop);
}

// updateParallax:
// perform the animatoin through animation frame before next repaint
function updateParallax() {
  window.requestAnimationFrame(updateImages);
}

// updateImages:
// the actual changing of the scrolling images.
// image shifting done through css translateY property, limited by the 
// maxTransform and minTransform properties due to image size
// shift image up/down via transformAmount depending on direction of scroll
function updateImages() {
  let scrollTop = $(window).scrollTop();

  // can change this variable to make the image shift go quicker, 
  // however it will reach its bounds quicker too
  const parallaxSpeed = 0.3;

  $.each(images, function(index, image) {
    if(isElementVisible(image.element)) {

      if(scrollTop > lastScrollTop) {
        // scrolling the page down to the bottom
        if(image.transformAmount <= image.maxTransform) {
          image.transformAmount += parallaxSpeed;
        }
      } else {
        // scrolling the page up to the top
        if(image.transformAmount >= image.minTransform) {
          image.transformAmount -= parallaxSpeed;
        }
      }

      image.element.css({"transform": `scale(1.25) translateX(20px) translateY(${image.transformAmount}px`});
    }
    
  });
  lastScrollTop = scrollTop;
}