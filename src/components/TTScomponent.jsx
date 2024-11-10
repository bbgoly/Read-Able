import { useState, useEffect } from "react";

// const TTSComponent = () => {
//   const [textToSpeak, setTextToSpeak] = useState("");

// useEffect(() => {
//   // Listen for messages from the background script
//   chrome.runtime.onMessage.addListener((message) => {
//     console.log(message.text);
//     if (message.type === "TTS_TEXT") {
//       setTextToSpeak(message.text);
//       handleSpeak(message.text); // Call TTS function
//     }
//   });
// }, []);

//   const handleSpeak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div>
//       <button onClick={() => handleSpeak(textToSpeak)}>
//         Read Selected Text
//       </button>
//     </div>
//   );
// };

// export default TTSComponent;

const TTSComponent = () => {
  const [selectedText, setSelectedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Get the highlighted text on the page

  useEffect(() => {
    // Connect to the background script via a long-lived connection
    const port = chrome.runtime.connect({ name: "tts-channel" });

    // Listen for messages from the background script through the port
    port.onMessage.addListener((message) => {
      console.log(message.text);
      if (message.type === "TTS_TEXT") {
        setSelectedText(message.text);
      }
    });

    // Clean up the port when the component unmounts
    return () => port.disconnect();
  }, []);

  // useEffect(() => {
  //   const handleSelectionChange = () => {
  //     const selection = window.getSelection();
  //     const text = selection.toString().trim();
  //     // console.log("Selection change event triggered!");
  //     // console.log("Selected Text:", text);
  //     setSelectedText(text);
  //   };

  //   document.addEventListener("selectionchange", handleSelectionChange);
  //   return () => {
  //     document.removeEventListener("selectionchange", handleSelectionChange);
  //   };

  //   // chrome.runtime.onMessage.addListener((message) => {
  //   //     console.log(message.text);
  //   //     if (message.type === "TTS_TEXT") {
  //   //       setSelectedText(message.text);
  //   //       // handleSpeak(message.text); // Call TTS function
  //   //     }
  //   //   });
  // }, []);

  // Start speaking

  const handleSpeak = () => {
    if (selectedText) {
      console.log("Speaking text:", selectedText);
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
      <h2>Text-to-Speech</h2>
      <div style={{ fontStyle: "italic", marginBottom: "10px" }}>
        {"Highlight text on the page to read it aloud."}
      </div>
      <button
        onClick={handleSpeak}
        disabled={isSpeaking || !selectedText}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Speak
      </button>
      <button
        onClick={handleStop}
        disabled={!isSpeaking}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Stop
      </button>
    </div>
  );
};

export default TTSComponent;
