import React, { useState } from 'react';

const ReadingModeComponent = () => {
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);

    // Query the active tab and toggle reading mode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            files: ['content-script.js']
          },
          () => {
           //send a message to notify or log status in the popup
            chrome.tabs.sendMessage(activeTab.id, {
              action: 'toggleReadingMode',
              isReadingMode: !isReadingMode,
            });
          }
        );
      }
    });
  };

  return (
    <div className="reading-mode-toggler">
      <button onClick={toggleReadingMode}>
        {isReadingMode ? 'Exit Reading Mode' : 'Enter Reading Mode'}
      </button>
    </div>
  );
}

export default ReadingModeComponent;
