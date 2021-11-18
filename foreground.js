// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function enrich() {
  const podcastLinks = contains("a", "podcasts.apple.com|apple.co|open.spotify.com|spoti.fi|podcasts.google.com");

  podcastLinks.map((link) => {
    link.href = (link.innerText.includes('…')) ? link.innerText.slice(0, -1) : link.innerText;
    link.setAttribute("data-podcast-link", link.href);
    link.innerText = "▶️ Listen Now";
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  setInterval(() => {
    console.log('afterDOMLoaded');
    enrich();
  }, 1000);
}
