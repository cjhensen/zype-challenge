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

// scrollToTop:
// scroll to top of window
// used after pagination button click
function scrollToTop() {
  window.scrollTo(0,0);
}

// handleNextBtnClicked:
// get next page of data from api
function handleNextBtnClicked() {
  console.log('handleNextBtnClicked');
  toggleLoader();
  getDataFromApi(pagination.next, processData);
  scrollToTop();
}

// handlePreviousBtnClicked:
// get previous page of data from api
function handlePreviousBtnClicked() {
  console.log('handlePreviousBtnClicked');
  toggleLoader();
  getDataFromApi(pagination.previous, processData);
  scrollToTop();
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