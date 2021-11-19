// https://github.com/jshemas/openGraphScraper
// https://www.youtube.com/watch?v=7MAdlGPMPEc
// https://levelup.gitconnected.com/how-to-use-background-script-to-fetch-data-in-chrome-extension-ef9d7f69625d
// https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/#workers
// https://stackoverflow.com/questions/52888097/fetch-meta-data-of-any-website-using-only-frontend-for-chrome-extensions
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
  }
}
xhr.send();

//https://developer.chrome.com/docs/extensions/mv2/xhr/
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'fetchUrl') {
        // WARNING: SECURITY PROBLEM - a malicious web page may abuse
        // the message handler to get access to arbitrary cross-origin
        // resources.
        fetch(request.url)
            .then(response => response.text())
            .then(text => sendResponse(text))
            .catch(error => ...)
        return true;  // Will respond asynchronously.
      }
    });
