import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
	const [count, setCount] = useState(0)
	const [font, setFont] = useState('Arial');
  
	const changeFont = (event) => {
	  const selectedFont = event.target.value;
	  setFont(selectedFont);
	  document.body.style.fontFamily = selectedFont;
	  document.documentElement.style.fontFamily = selectedFont;
	}
  
	return (
	  <>
		<div>
		  <a href="https://vite.dev" target="_blank">
			<img src={viteLogo} className="logo" alt="Vite logo" />
		  </a>
		  <a href="https://react.dev" target="_blank">
			<img src={reactLogo} className="logo react" alt="React logo" />
		  </a>
		</div>
		<h1>Vite + React</h1>
		<div className="card">
		  <button onClick={() => setCount((count) => count + 1)}>
			count is {count}
		  </button>
		  <p>
			Edit <code>src/App.jsx</code> and save to test HMR
		  </p>
		</div>
		<p className="read-the-docs">
		  Click on the Vite and React logos to learn more
		</p>
  
		<div className="font-changer">
		  <label htmlFor="font-select">Select Font: </label>
		  <select id="font-select" onChange={changeFont} value={font}>
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
