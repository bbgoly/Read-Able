// content-script.js

// TTS
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Send the selected text to the background script
    chrome.runtime.sendMessage({ type: "SELECTED_TEXT", text: selectedText });
  }
});

// FontChange
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

