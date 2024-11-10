import React, { useState } from "react";
import Goals from "./Goals";
import Timer from "./Timer"
import "../styles/TaskManager.css"

function TaskManager() {
    const [isTimerTab, setIsTimerTab] = useState(true);

    return (
        <div id="container">
            <div id="tabContainer">
				<span
					style={{backgroundColor: isTimerTab ? '#ddd' : 'transparent'}}
					onClick={() => setIsTimerTab(true)}
				>
					Timer
				</span>
				<span 
					style={{backgroundColor: !isTimerTab ? '#ddd' : 'transparent'}}
					onClick={() => setIsTimerTab(false)}
				>
					Goals
				</span>
			</div>
            
            {isTimerTab ? <Timer/> : <Goals/>}
        </div>
    )
}

export default TaskManager;