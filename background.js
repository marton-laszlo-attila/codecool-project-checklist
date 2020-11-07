chrome.webNavigation.onCompleted.addListener(function(data) {
  console.log("E " + data.url);
  callMessage(data.url);
}, {url: [{urlMatches : 'https://journey.code.cool/v2/project/curriculum/project/*'}]});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (typeof changeInfo.url !== 'undefined') {
    var urlCheck = changeInfo.url.search("curriculum/project");
    if (urlCheck > 0) { 
      console.log(changeInfo.url);
      callMessage (changeInfo.url);
    }
  }
});

function callMessage(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", url: url}, function(response) {
      console.log(response.farewell);
    });
  });
} 