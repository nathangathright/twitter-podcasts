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
  const podcastLinks = contains("a", "podcasts.google.com|podcasts.apple.com");

  podcastLinks.map((link) => {
    link.href = link.innerText.slice(0, -1);
    link.setAttribute("data-podcast-link", link.href);
    link.innerText = "▶️ Listen Now";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded');
  enrich();
});
