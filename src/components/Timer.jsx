import React, { useState, useEffect } from "react";
import "../styles/Timer.css"

function Timer() {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
        let currentTime = 0;
		if (isActive) {
			currentTime = setInterval(() => {
                console.log(time)
                setTime((prevTime) => prevTime + 1)
            }, 1000)
		} else {
			clearInterval(currentTime)
		}
		return () => clearInterval(currentTime)
	}, [isActive, time])

	const startTimer = () => setIsActive(true);
	const stopTimer = () => setIsActive(false);
	const resetTimer = () => {
		stopTimer();
		setTime(0);
	}

    const formatTime = () => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)
        const seconds = time % 60
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

	return (
		<div>
			<div id="timerDisplay">{formatTime()}</div>
			<div id="buttonContainer">
				<button id="timerButton" onClick={startTimer}>Start</button>
				<button id="timerButton" onClick={stopTimer}>Stop</button>
				<button id="timerButton" onClick={resetTimer}>Reset</button>
			</div>
		</div>
	)
}

export default Timer;