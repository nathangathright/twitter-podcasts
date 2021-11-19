// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function getEmbeddable(link) {
  let hostname = new URL(link).hostname;
  switch (hostname) {
    case "podcasts.apple.com":
      if(link.indexOf("i=") > -1) {
        createIframe(
          link.replace('podcasts.apple.com', 'embed.podcasts.apple.com'),
          "480px",
          "175px"
        )
        }
      else {
        createIframe(
          link.replace('podcasts.apple.com', 'embed.podcasts.apple.com'),
          "320px",
          "432px"
        )
      }
      break;
    case "open.spotify.com":
      createIframe(
        link.replace('open.spotify.com/', 'open.spotify.com/embed/'),
        "480px",
        "232px"
      );
    case "share.transistor.fm":
      createIframe(
        link.replace('share.transistor.fm/s', 'share.transistor.fm/e'),
        "480px",
        "180px"
      );
    default:
      break;
  } 
}

function destroyIframe() {
  const iframe = document.getElementById('floating-iframe');
  if (iframe) {
    iframe.parentNode.removeChild(iframe);
  }
}

function createIframe(src = "", width = "0px", height = "0px") {
  destroyIframe()
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'floating-iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('allow', 'encrypted-media');
  iframe.setAttribute('style', "position:fixed;bottom:20px;right:20px;max-width:calc(100% - 40px)");
  iframe.setAttribute('src', src);
  iframe.setAttribute('width', width);
  iframe.setAttribute('height', height);
  document.body.appendChild(iframe);
}

function enrich() {
  // const podcastLinks = contains("a", "podcasts.apple.com/|apple.co/|open.spotify.com/|spoti.fi/|podcasts.google.com/");
  const podcastLinks = contains('a', "podcasts.apple.com/|open.spotify.com/|share.transistor.fm/s/");

  podcastLinks.map((link) => {
    let newhref = (link.innerText.includes('…')) ? link.innerText.slice(0, -1) : link.innerText;
    link.href = newhref.replace('http:', 'https:');
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
