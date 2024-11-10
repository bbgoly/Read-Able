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
  if (message.action === "changeFont") {
    applyFont(message.font);
  }
});

// Create and inject the ruler element into the webpage
const rulerElement = document.createElement("div");
rulerElement.classList.add("dyslexia-ruler");
document.body.appendChild(rulerElement);

// Set initial styles for the ruler
rulerElement.style.position = "absolute";
rulerElement.style.height = "2px";
rulerElement.style.backgroundColor = "#FF0000";
rulerElement.style.width = "100%";
rulerElement.style.zIndex = "1000";

// Initially hide the ruler
rulerElement.style.display = "none";

// Add mousemove event listener to move the ruler
const handleMouseMove = (event) => {
  if (rulerElement.style.display === "block") {
    rulerElement.style.top = `${event.clientY}px`;
  }
};

document.addEventListener("mousemove", handleMouseMove);

// Listen for messages to toggle ruler visibility
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleRuler") {
    if (rulerElement.style.display === "none") {
      rulerElement.style.display = "block";
    } else {
      rulerElement.style.display = "none";
    }
  }
});

// Cleanup the event listener when the script is unloaded
window.addEventListener("beforeunload", () => {
  document.removeEventListener("mousemove", handleMouseMove);
});
