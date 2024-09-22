import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos');
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) {
            alert("Please enter a todo item.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/todo', { text: newTodo });
            setTodos([...todos, { text: newTodo, _id: response.data._id, completed: false }]);
            setNewTodo('');
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:5000/todo/${todoToDelete}`);
            setTodos(todos.filter(todo => todo._id !== todoToDelete));
            setTodoToDelete(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            try {
                await axios.put(`http://localhost:5000/todo/${id}`, { completed: !todo.completed });
                fetchTodos();
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        }
    };

    const pendingTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <br></br>
            <br></br>
            <br></br>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Todo</button>
            <br></br>
            <br></br>
            <div className="todo-section">
                <h2>Pending Tasks</h2>
                <ul className="todo-list">
                    {pendingTodos.map(todo => (
                        <li key={todo._id} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo._id)}
                            />
                            {todo.text}
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setTodoToDelete(todo._id);
                                    setShowDeleteModal(true);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="todo-section">
                <h2>Completed Tasks</h2>
                <ul className="todo-list">
                    {completedTodos.map(todo => (
                        <li key={todo._id} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo._id)}
                            />
                            {todo.text}
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setTodoToDelete(todo._id);
                                    setShowDeleteModal(true);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Todo</h2>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Enter todo..."
                        />
                        <button className="btn btn-primary" onClick={addTodo}>Add</button>
                        <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this todo?</p>
                        <button className="btn btn-danger" onClick={deleteTodo}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
