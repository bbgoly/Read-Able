document.addEventListener("selectionchange", () => { // mouseup
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
  if (message.action === "changeFont") {
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

let rulerElement = null;

// Add mousemove event listener to move the ruler
const handleMouseMove = (event) => {
  if (rulerElement.style.display === "block") {
    rulerElement.style.top = `${event.clientY}px`;
  }
};

// Listen for messages to toggle ruler visibility
chrome.runtime.onMessage.addListener((message) => {
    console.log("ruler toggled")
  if (message.action === "toggleRuler") {
    rulerElement = document.getElementById("dyslexia-ruler");

    if (!rulerElement) {
        rulerElement = document.createElement("div");
        rulerElement.classList.add("dyslexia-ruler");

        // Set initial styles for the ruler
        rulerElement.style.position = "absolute";
        rulerElement.style.height = "2px";
        rulerElement.style.backgroundColor = "#FF0000";
        rulerElement.style.width = "100%";
        rulerElement.style.zIndex = "1000";

        // Initially hide the ruler
        rulerElement.style.display = "none";
        document.body.appendChild(rulerElement);
        document.addEventListener("mousemove", handleMouseMove);
    }

    if (rulerElement.style.display === "none" || rulerElement.style.display === "") {
      rulerElement.style.display = "block";
    } else {
      document.body.removeChild(rulerElement);
    }
  }
});

// Cleanup the event listener when the script is unloaded
window.addEventListener("beforeunload", () => {
  document.removeEventListener("mousemove", handleMouseMove);
});
