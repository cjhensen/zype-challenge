/* ************************************************************
apiHandler.js
Author: Christian Hensen
getDataFromApi - get the data from Zype
processData - process data and render to page
renderThumbnailHtml - render markup for each thumbnail
************************************************************ */
let pagination = {};

// getDataFromApi:
// pass in required parameters
// optional 'active' param for the API call
// callbackFn handles the data received
function getDataFromApi(goToPage, callbackFn) {
  console.log('getDataFromApi');

  const API_URL = 'https://api.zype.com/videos';
  const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
  const settings = {
    url: API_URL,
    data: {
      api_key: API_KEY,
      active: true,
      page: goToPage
    },
    dataType: 'json',
    type: 'GET',
    success: callbackFn
  };

  $.ajax(settings);
}

// processData:
// callback for getDataFromApi
// handles the received data from the request
function processData(data) {
  console.log('processData');
  console.log('data', data);

  // set local pagination variable
  pagination = data.pagination;

  // array of response items
  const videoItems = data.response;

  // array of elements to be rendered
  const videoElements = [];

  // build the html for each item and add to array to be rendered
  videoItems.forEach(function (item) {
    videoElements.push(renderThumbnailHtml(item));
  });

  toggleLoader();
  emptyVideoElements();
  // add video elements to the page
  $(VIDEOS_CONTAINER).html(videoElements);

  // activate the parallax effect (once items are rendered)
  initializeParallax();
}

function emptyVideoElements() {
  if ($(VIDEOS_CONTAINER).children().length > 0) {
    $(VIDEOS_CONTAINER).empty();
  }
}

// renderThumbnailHtml:
// build the html for each item with image and title
function renderThumbnailHtml(item) {
  console.log('renderThumbnailHtml');

  // variables for title and thumbnailUrl
  const title = item.title;
  let thumbnailUrl = "";

  // using thumbnail sizes with height of either 360 or 480
  // builds an array of thumbnails per item with those sizes
  const selectedThumbnailSizes = item.thumbnails.filter(function (thumbnail) {
    return thumbnail.height === 360 || thumbnail.height === 480;
  });

  // use the first item in the array for the size (will always be either 360 or 480)
  // if there aren't any thumbnails available use my placeholder
  // else use the url of the image supplied
  if (selectedThumbnailSizes.length === 0) {
    thumbnailUrl = 'http://via.placeholder.com/640x480';
  } else {
    thumbnailUrl = selectedThumbnailSizes[0].url;
  }

  return `
    <div class="row">
      <div class="col-xs-12">
        <div class="video">
          <div class="thumbnail">
            <img class="parallax" src="${thumbnailUrl}" alt="${title}" />
          </div>
          <div class="title">
            ${title}
          </div>
        </div>
      </div>
    </div>
  `;
}
/* ************************************************************
app.js
Author: Christian Hensen
handleWindowScrolled
assignEventHandlers
runApp
handlePreviousBtnClicked - navigate to previous page of videos
handleNextBtnClicked - navigate to next page of videos
toggleLoader
************************************************************ */

// videos container selector
const VIDEOS_CONTAINER = '.videos';
// Previous and Next button selectors
const BTN_PREVIOUS = '.btn-previous';
const BTN_NEXT = '.btn-next';
// loader selector
const LOADER = '.loader-container';
// pagination container selector
const PAGINATION_CONTAINER = '.pagination';

// toggleLoader:
// toggle displaying the loader
function toggleLoader() {
  $(LOADER).toggleClass('show');
}

// handleNextBtnClicked:
// get next page of data from api
function handleNextBtnClicked() {
  console.log('handleNextBtnClicked');
  toggleLoader();
  getDataFromApi(pagination.next, processData);
}

// handlePreviousBtnClicked:
// get previous page of data from api
function handlePreviousBtnClicked() {
  console.log('handlePreviousBtnClicked');
  toggleLoader();
  getDataFromApi(pagination.previous, processData);
}

// handleWindowScrolled:
// parallax entry point on window scroll
function handleWindowScrolled() {
  updateParallax();
}

// assignEventHandlers:
// assigns event handlers
function assignEventHandlers() {
  $(window).on('scroll', handleWindowScrolled);
  $(BTN_PREVIOUS).on('click', handlePreviousBtnClicked);
  $(BTN_NEXT).on('click', handleNextBtnClicked);
}

// runApp:
// starts the app by getting data from api, showing on screen, 
// then attaching event handlers
function runApp() {
  console.log('runApp');
  getDataFromApi(1, processData);
  toggleLoader();
  assignEventHandlers();
}

$(runApp());
/* ************************************************************
parallax.js
Author: Christian Hensen
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
  $(PARALLAX_IMG).each(function (index) {
    const parallaxImg = {};
    parallaxImg.element = $(this);
    parallaxImg.height = parallaxImg.element.height();
    parallaxImg.transformAmount = -25;
    parallaxImg.maxTransform = 25;
    parallaxImg.minTransform = -25;

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
  const elementMiddle = elementBottom - element.height() / 2;

  return elementMiddle <= documentBottom && elementMiddle >= documentTop;
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

  $.each(images, function (index, image) {
    if (isElementVisible(image.element)) {

      if (scrollTop > lastScrollTop) {
        // scrolling the page down to the bottom
        if (image.transformAmount <= image.maxTransform) {
          image.transformAmount += parallaxSpeed;
        }
      } else {
        // scrolling the page up to the top
        if (image.transformAmount >= image.minTransform) {
          image.transformAmount -= parallaxSpeed;
        }
      }

      image.element.css({ "transform": `scale(1.25) translateY(${image.transformAmount}px` });
    }
  });
  lastScrollTop = scrollTop;
}