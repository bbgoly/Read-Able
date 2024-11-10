document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Send the selected text to the background script
    chrome.runtime.sendMessage({ type: "SELECTED_TEXT", text: selectedText });
  }
});

// FONTCHANGE
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

// FONTSIZE
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

// READINGMODE
function toggleReadingModeInPage(enable) {
  if (enable) {
    // Hide images, videos, and iframes, etc.
    const elementsToHide = [
      'img', 'video', 'iframe', '.sidebar', '.advertisement', '.banner', '.popup', '.navigation',
    ]; 

    elementsToHide.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.style.display = 'none';
      });
    });
    document.querySelectorAll("*").forEach((element) => {
      element.style.backgroundColor = '#FFFFC5';
      element.style.fontFamily = 'Georgia';
      //element.style.color = '#111';
    });
  } else {
    // Show everything again and reset the styles
    const elementsToShow = [
      'img', 'video', 'iframe', '.sidebar', '.advertisement', '.banner', '.popup', '.navigation',
    ];

    elementsToShow.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.style.display = '';
      });
    });
    document.querySelectorAll("*").forEach((element) => {
      element.style.backgroundColor = '';
      //element.style.color = '';
    });
  }
}

window.toggleReadingModeInPage = toggleReadingModeInPage;

// Listen for messages to toggle reading mode
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleReadingMode') {
    toggleReadingModeInPage(message.isReadingMode);
  }
});
