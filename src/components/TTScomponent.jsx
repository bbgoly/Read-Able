import { useState, useEffect } from "react";
import "../index.css";

const TTSComponent = () => {
  const [selectedText, setSelectedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Get the highlighted text on the page

  useEffect(() => {
    // Connect to the background script via a long-lived connection
    const port = chrome.runtime.connect({ name: "tts-channel" });

    // Listen for messages from the background script through the port
    port.onMessage.addListener((message) => {
      if (message.type === "TTS_TEXT") {
        setSelectedText(message.text);
      }
    });

    // Clean up the port when the component unmounts
    return () => port.disconnect();
  }, []);

  // Start speaking

  const handleSpeak = () => {
    if (selectedText) {
      chrome.tts.speak(
        selectedText,
        {
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          onEvent: (event) => {
            if (event.type === "error") {
              console.error("Error speaking text:", event);
            } else if (event.type === "end") {
              setIsSpeaking(false);
            }
          },
        },
        (error) => {
          if (error) {
            console.error("Error with TTS:", error);
          }
        }
      );
      setIsSpeaking(true);
    }
  };

  // Stop speaking
  const handleStop = () => {
    chrome.tts.stop();
    setIsSpeaking(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <button
        onClick={handleSpeak}
        disabled={isSpeaking || !selectedText}
        className="shared-button green-button"
      >
        Speak
      </button>
      <button
        onClick={handleStop}
        disabled={!isSpeaking}
        className="shared-button red-button"
      >
        Stop
      </button>
    </div>
  );
};

export default TTSComponent;
