/* ************************************************************
app.js
handleWindowScrolled
assignEventHandlers
runApp
************************************************************ */

// videos container selector
const VIDEOS_CONTAINER = '.videos';

// handleWindowScrolled:
// parallax entry point on window scroll
function handleWindowScrolled() {
  updateParallax();
}

// assignEventHandlers:
// assigns event handlers
function assignEventHandlers() {
  $(window).on('scroll', handleWindowScrolled);
}

// runApp:
// starts the app by getting data from api, showing on screen, 
// then attaching event handlers
function runApp() {
  console.log('runApp');
  getDataFromApi(processData);
  assignEventHandlers();
}

$(runApp());