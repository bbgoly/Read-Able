import React, { useState } from "react";
import "../index.css";

function DyslexiaRuler() {
  const [isRulerActive, setIsRulerActive] = useState(false);

  // Function to toggle the ruler in the content script
  const toggleRuler = () => {
    setIsRulerActive((prevState) => !prevState);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage(tabs[0].id, { action: "toggleRuler" });
    });
  };

  return (
    <div className="popup-container">
      <h3 style={{color: "white"}} >Dyslexia Ruler</h3>
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
