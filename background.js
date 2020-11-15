chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'journey.code.cool'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
  
  chrome.webNavigation.onCompleted.addListener(function(data) {
  callMessage(1);
}, {url: [{urlMatches : 'https://journey.code.cool/v2/project/curriculum/project/*'}]});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (typeof changeInfo.url !== 'undefined') {
    var urlCheck = changeInfo.url.search("curriculum/project");
    if (urlCheck > 0) { 
      callMessage (2);
    }
  }
});

function callMessage(status) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "CodeCool check", status: status}, function() {
        //console.log(response.farewell);
      });
    }
  });
} 
