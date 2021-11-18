// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.
// Importing and using functionality from external files is also possible.

importScripts("foreground.js");
importScripts("toggleIcon.js");

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: enrich,
  });
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.scheme == "dark") {
    chrome.browserAction.setIcon({
      path : "logo/icon-dark.png"
    });
  }
});
