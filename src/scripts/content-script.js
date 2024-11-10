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
  document.querySelectorAll("*").forEach((element) => {
    element.style.fontFamily = font;
  });
}
// Listen for messages from the popup to change the font
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'changeFont') {
    applyFont(message.font);
  }
});

//FontSize

function applyFontSize(fontSize) {
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      font-size: ${fontSize} !important;
    }
  `;
  document.head.appendChild(style);
}

// Listen for messages to change the font size
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "changeFontSize") {
    applyFontSize(message.fontSize);
  }
});