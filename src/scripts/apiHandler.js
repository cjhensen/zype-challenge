/* ************************************************************
apiHandler.js
Author: Christian Hensen
getDataFromApi - get the data from Zype
processData - process data and render to page
renderThumbnailHtml - render markup for each thumbnail
replaceImage - replaces broken image urls with my custom url
handleImageErrors - event handler for broken image urls
emptyVideoElements
************************************************************ */
let pagination = {};

// video element thumbnail image
const VIDEO_ELEMENT_IMG = '.thumbnail img';

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
    success: callbackFn,
    error: function (jqXHR, status, error) {
            console.log('error', jqXHR);
            console.log('error', status);
            console.log('error', error);
    }
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
  videoItems.forEach(function(item) {
    videoElements.push(renderThumbnailHtml(item));
  });

  toggleLoader();
  emptyVideoElements();
  // add video elements to the page
  $(VIDEOS_CONTAINER).html(videoElements);
  // handle image errors (broken links) once contents rendered to page
  handleImageErrors();
  // activate the parallax effect (once items are rendered)
  initializeParallax();
}

// emptyVideoElements:
// clear video elements container before rendering new list from pagination
function emptyVideoElements() {
  if($(VIDEOS_CONTAINER).children().length > 0) {
    $(VIDEOS_CONTAINER).empty();
  }
}

// handleImageErrors:
// if image has error (broken url) after they are rendered to the page, replace the url
// need to have this event handler here because it needs to be triggered once image elements are
// loaded since there aren't any on page load.
function handleImageErrors() {
  $(VIDEO_ELEMENT_IMG).on('error', replaceImage);
}

// replaceImage:
// replace the image url with my custom placeholder
function replaceImage() {
  let customThumbnail = 'http://via.placeholder.com/640x480';
  $(this).attr('src', customThumbnail);
}

// renderThumbnailHtml:
// build the html for each item with image and title
function renderThumbnailHtml(item) {
  console.log('renderThumbnailHtml');

  // variables for title and thumbnailUrl
  const title = item.title;
  let thumbnailUrl = "";
  let customThumbnail = 'http://via.placeholder.com/640x480';

  // using thumbnail sizes with height of either 360 or 480
  // builds an array of thumbnails per item with those sizes
  const selectedThumbnailSizes = item.thumbnails.filter(function(thumbnail) {
    return thumbnail.height === 360 || thumbnail.height === 480;
  });

  // use the first item in the array for the size (will always be either 360 or 480)
  // if there aren't any thumbnails available use my placeholder
  // else use the url of the image supplied
  if(selectedThumbnailSizes.length === 0) {
    thumbnailUrl = 'http://via.placeholder.com/640x480';
  } else {
    thumbnailUrl = selectedThumbnailSizes[0].url;
  }

  return `
    <div class="row">
      <div class="col-xs-12 col-md-8 col-md-offset-2">
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