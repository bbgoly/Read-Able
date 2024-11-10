import React, { useState } from "react"
import "../styles/Goals.css"

function Goals() {
    const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask.trim()])
            setNewTask('')
        }
    }

    const removeTask = (taskIndex) => {
        setTasks(tasks.filter((_, i) => i !== taskIndex))
    }

    return (
        <div id="todoContainer">
            <input
                id="todoInput"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button id="addButton" onClick={addTask}>Add Task</button>
            <ul id="taskList">
                {tasks.map((task, index) => (
                <li key={index} id="taskItem">
                    {task}
                    <button id="deleteButton" onClick={() => removeTask(index)}>Remove</button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Goals;