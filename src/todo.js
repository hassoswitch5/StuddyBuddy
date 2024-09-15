import React, { useState } from 'react';
import './App.css'; // Importing the CSS file

function Todo() {
    const [task, setTask] = useState('');
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const addTask = () => {
        if (task) {
            setPendingTasks([...pendingTasks, task]);
            setTask('');
        }
    };

    const completeTask = (index) => {
        const newPendingTasks = pendingTasks.filter((_, i) => i !== index);
        const taskToComplete = pendingTasks[index];
        setPendingTasks(newPendingTasks);
        setCompletedTasks([...completedTasks, taskToComplete]);
    };

    return (
        <div style={{}}>
            <h1><b>To-Do List</b></h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter your task"
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                <h2>Pending Tasks</h2>
                <ul>
                    {pendingTasks.map((task, index) => (
                        <li key={index}>
                            <span>{task}</span>
                            <button onClick={() => completeTask(index)}>Complete</button>
                        </li>
                    ))}
                </ul>
                <h2>Completed Tasks</h2>
                <ul>
                    {completedTasks.map((task, index) => (
                        <li key={index} className="completed">
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
