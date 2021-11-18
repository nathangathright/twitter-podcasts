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

function getEmbeddable(link) {
  let hostname = new URL(link).hostname;
  switch (hostname) {
    case "podcasts.apple.com":
      let src = link.replace('podcasts.apple.com', 'embed.podcasts.apple.com');
      updateIframe(src, "479px", "432px");      
      break;
    case "open.spotify.com":
      let src = link.replace('open.spotify.com', 'spotify.com/embed/');
      updateIframe(src, "480px", "232px");
    default:
      break;
  }  
}

function createIframe() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'floating-iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('allow', 'encrypted-media');
  iframe.setAttribute('width', "0px");
  iframe.setAttribute('height', "0px");
  iframe.setAttribute('style', "position:fixed;bottom:20px;right:20px;max-width:calc(100% - 40px)");
  document.body.appendChild(iframe);
}

function updateIframe(src = "", width = "0px", height = "0px") {
  var iframe = document.getElementById('floating-iframe');
  iframe.setAttribute('src', src);
  iframe.setAttribute('width', width);
  iframe.setAttribute('height', height);
}

function enrich() {
  // const podcastLinks = contains("a", "podcasts.apple.com/|apple.co/|open.spotify.com/|spoti.fi/|podcasts.google.com/");
  const podcastLinks = contains('a', "podcasts.apple.com/|open.spotify.com/");

  podcastLinks.map((link) => {
    link.href = (link.innerText.includes('…')) ? link.innerText.slice(0, -1) : link.innerText;
    link.setAttribute("data-podcast-link", link.href);
    link.innerText = "▶️ Listen Now";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      getEmbeddable(event.target.href);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  createIframe();
  setInterval(() => {
    enrich();
  }, 1000);
}
