let ttsPort = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "tts-channel") {
	ttsPort = port;
  }

  port.onDisconnect.addListener(() => {
	if (port === ttsPort) {
	  ttsPort = null;
	}
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.text);
  if (message.type === "SELECTED_TEXT" && ttsPort) {
	// Send the selected text to the TTS component
	ttsPort.postMessage({ type: "TTS_TEXT", text: message.text });
  }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })