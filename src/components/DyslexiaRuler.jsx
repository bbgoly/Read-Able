// src/components/DyslexiaRuler.js
import React, { useState } from "react";
import "../index.css"; // Add your CSS for the popup

function DyslexiaRuler() {
  const [isRulerActive, setIsRulerActive] = useState(false);

  // Function to toggle the ruler in the content script
  const toggleRuler = () => {
    setIsRulerActive((prevState) => !prevState);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: toggleRulerInContentScript,
      });
    });
  };

  // Function to send a message to content script to toggle the ruler visibility
  const toggleRulerInContentScript = () => {
    chrome.runtime.sendMessage({ action: "toggleRuler" });
  };

  return (
    <div className="popup-container">
      <h3>Dyslexia Ruler</h3>
      <button
        onClick={toggleRuler}
        className={`shared-button ${
          isRulerActive ? "red-button" : "green-button"
        }`}
      >
        {isRulerActive
          ? "Deactivate Dyslexia Ruler"
          : "Activate Dyslexia Ruler"}
      </button>
    </div>
  );
}

export default DyslexiaRuler;
