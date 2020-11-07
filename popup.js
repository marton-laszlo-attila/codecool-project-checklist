document.getElementById("deleteCurrent").addEventListener("click", function () {
  var result = confirm("Biztos, hogy törölni akarod?");
  if (result) {
      sendMessage('yesCurrent');
  }
});

document.getElementById("deleteAll").addEventListener("click", function () {
  var result = confirm("Biztos, hogy törölni akarod?");
  if (result) {
      sendMessage('yesAll');
  }
});

function sendMessage(param) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: param}, function(response) {
      //console.log(response.farewell);
    });
  });
}