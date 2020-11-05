chrome.runtime.onInstalled.addListener(function() {
    // ...
  
    chrome.webNavigation.onCompleted.addListener(function (tabId, url , frameId, timeStamp) {
      // changeInfo object: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
      // status is more reliable (in my case)
      // use "alert(JSON.stringify(changeInfo))" to check what's available and works in your case
      console.log("Ez ------> " + url);
      if (changeInfo.status === 'complete') {
          console.log("Ez ------> " + url);
        chrome.tabs.sendMessage(tabId, {
          message: 'TabUpdated'
        });
      }
    })

  });