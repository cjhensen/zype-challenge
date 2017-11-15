// getDataFromApi:
// pass in required parameters
// optional 'active' param for the API call
// callbackFn handles the data received
function getDataFromApi(callbackFn) {
  console.log('getDataFromApi');

  const API_URL = 'https://api.zype.com/videos';
  const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
  const settings = {
    url: API_URL,
    data: {
      api_key: API_KEY,
      active: true
    },
    dataType: 'json',
    type: 'GET',
    success: callbackFn
  };

  $.ajax(settings);
}

function processData(data) {
  console.log('processData');
  console.log('data', data);
  
  
}

function renderThumbnailHtml(item) {
  console.log('renderThumbnailHtml');
}


function runApp() {
  console.log('runApp');
  getDataFromApi(processData);
}

$(runApp());