import React, { useState } from 'react';

const FontSizeChangeComponent = () => {
  const [fontSize, setFontSize] = useState('16'); // Default font size

  const changeFontSize = (event) => {
    const newFontSize = event.target.value;
    setFontSize(newFontSize);

    // Query the active tab and apply the font size
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            files: ['content-script.js']
          },
          () => {
            // Send message to the content script with the new font size
            chrome.tabs.sendMessage(activeTab.id, { action: 'changeFontSize', fontSize: `${newFontSize}px` });
          }
        );
      }
    });
  };

  return (
    <div className="font-size-changer">
      <label htmlFor="font-size-slider">Font Size: {fontSize}px</label>
      <input
        id="font-size-slider"
        type="range"
        min="8"
        max="42"
        value={fontSize}
        onChange={changeFontSize}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default FontSizeChangeComponent;
