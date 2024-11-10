// content.js

function applyFont(font) {
  document.body.style.fontFamily = font;
  document.documentElement.style.fontFamily = font;
}

// Listen for messages from the popup to change the font
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'changeFont') {
    applyFont(message.font);
  }
});
