import React, { useState } from 'react'
import './App.css'

function App() {
	const [font, setFont] = useState('Arial');
  
	const changeFont = (event) => {
		const newFont = event.target.value;
		setFont(newFont);

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		  const activeTab = tabs[0];
		  if (activeTab?.id) {
			// First, inject content.js into the page if it's not already injected
			chrome.scripting.executeScript(
			  {
				target: { tabId: activeTab.id },
				files: ['content.js'],
			  },
			  () => {
				// After injecting, send a message to change the font
				chrome.tabs.sendMessage(activeTab.id, {action: 'changeFont', font: newFont});
			  }
			);
		  }
		});
	  };
  
	return (
	  <>

		<p className="read-the-docs">
		  Hello world!
		</p>
  
		<div className="font-changer">
		  <label htmlFor="font-select">Select Font: </label>
		  <select value={font} onChange={changeFont}>
			  <option value="Arial">Arial</option>
			  <option value="Courier New">Courier New</option>
			  <option value="Georgia">Georgia</option>
			  <option value="Times New Roman">Times New Roman</option>
			  <option value="Verdana">Verdana</option>
		  </select>
		</div>
	  </>
	)
  }
export default App
