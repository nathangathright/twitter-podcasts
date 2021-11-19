<div align="center">
    <img src="logo/icon-blue.png"/>
    <h1>Twitter Podcasts</h1>
    <h3>Enhancing podcast links on Twitter.com</h3>
</div>

Have you ever wanted to listen to podcasts as you scroll Twitter? This Chrome extension transforms normal podcast links into buttons that launch a persistent floating audio player.

## Features
Currently supports a small handful of embeddable players. Pull requests welcome!

#### Platforms
- podcasts.apple.com/
- open.spotify.com/

#### Hosts
- share.transistor.fm/

## Roadmap
Desired features that I'd appreciate help with:
- Overcast player (need Marco to fix his X-Frame-Options)
- [Host players](https://www.podcastinsights.com/podcast-embed-players/)
- Exanding shortlinks to fetch platform players 
- Parse pod.link URLs to fetch platform players
- Handle other podcast links with video.js

## Installation
- **Clone this repo to your local machine**. If you don't have a github account, you can simply download a zip of the repo and unzip it on your computer. (Code → Download ZIP)
- **Open [the extensions page](chrome://extensions)** in your browser: `chrome://extensions`. This link works on any chromium-based browser.
- If you did not do it already, **toggle the "developer mode"**. This is usually a toggle button at the top right of the extensions page.
- Click the button **_load unpacked extension_**.
- In the window that pops up, **select the folder that contains this minimal extension**, then **click _ok_**.
- **Done!** A new extension called _Twitter Podcasts_ should have appeared in the list.

## Q&A
> Does this work only on Chrome or on **other web browsers** as well?

At the moment, this works on every chromium-based web browser that supports v3 extensions.
Therefore, you should be able to install this extension on any of the following browsers (as long as they are up-to-date):
- Chromium
- Brave
- Chrome
- Edge
- Vivaldi
- Opera

> So it doesn't work on **Firefox** or **Safari**?

No, Firefox uses a different extension format. That being said, it is usually not too hard to port extensions from Chrome to Firefox.
Read [their porting documentation](https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/) for more information.

Safari uses yet another extension format and porting is usually harder.
You can find more information [here](https://bartsolutions.github.io/2020/11/20/safari-extension/).

> Does this work on **Chrome for Android/iOS**?

Chrome for mobile doesn't currently support extensions.

> How do I **uninstall** this extension from my browser?

- Go to the [extensions page](chrome://extensions): chrome://extensions.
  There should be a card with the name of this extension as title.
  If you don't see such a card, it means the extension is not installed.
- Simply click the _Delete_ button at the bottom of the card. Click _ok_ if a popup asks you for confirmation. The extension is now uninstalled.
