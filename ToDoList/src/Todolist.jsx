import React, { useState } from 'react';
import './index.css';

function Todolist() {
    const [tasks, setTasks] = useState(["", "", "", "", ""]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [completed, setCompleted] = useState([false, false, false, false, false]);

    const handleLineClick = (index) => {
        setEditingIndex(index);
    };

    const handleInputChange = (e, index) => {
        const newTasks = [...tasks];
        newTasks[index] = e.target.value;
        setTasks(newTasks);
    };

    const handleInputBlur = (e) => {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('delete-button')) {
            setEditingIndex(null);
        }
    };

    const handleDeleteClick = (e, index) => {
        e.stopPropagation();
        const newTasks = [...tasks];
        newTasks[index] = "";
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <h1 className="title">TO-DO LIST</h1>
            <div className="list">
                {tasks.map((task, index) => (
                    <div key={index} className="list-item" onClick={() => handleLineClick(index)}>

                        {/* Square */}
                        <div
                            className={`square ${completed[index] ? 'completed' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                const newCompleted = [...completed];
                                newCompleted[index] = !newCompleted[index];
                                setCompleted(newCompleted);
                            }}
                        >
                            {completed[index] && "✅"}
                        </div>

                        {/* Line */}
                        {editingIndex === index ? (
                            <div className="line editing">
                                <input
                                    className="input-line"
                                    value={task}
                                    onChange={(e) => handleInputChange(e, index)}
                                    onBlur={(e) => handleInputBlur(e)}
                                    onKeyDown={(e) => e.key === "Enter" && setEditingIndex(null)}
                                    autoFocus
                                />
                                <span
                                    className="delete-button"
                                    tabIndex="-1"
                                    onClick={(e) => handleDeleteClick(e, index)}
                                >
                                    ✖
                                </span>
                            </div>
                        ) : (
                            <div className={`line ${completed[index] ? 'line-completed' : ''}`}>
                                <span className="task-text">{task || ""}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
