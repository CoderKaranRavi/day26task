import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:3001/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const newTodo = { name, description };
        await axios.post('http://localhost:3001/todos', newTodo);
        fetchTodos();
        setName('');
        setDescription('');
    };

    const updateTodo = async (id, updatedData) => {
        await axios.put(`http://localhost:3001/todos/${id}`, updatedData);
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:3001/todos/${id}`);
        fetchTodos();
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        return todo.status === filter;
    });

    return (
        <div className="container">
            <h1>Todo App</h1>
            <div className="todo-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Task Name"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                ></textarea>
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <div className="filters">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('not completed')}>Not Completed</button>
            </div>
            <div className="todo-list">
                {filteredTodos.map(todo => (
                    <div key={todo.id} className="card">
                        <h3>{todo.name}</h3>
                        <p>{todo.description}</p>
                        <select
                            value={todo.status}
                            onChange={(e) => updateTodo(todo.id, { status: e.target.value })}
                        >
                            <option value="not completed">Not Completed</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button onClick={() => updateTodo(todo.id, { name: prompt("New name:", todo.name) || todo.name, description: prompt("New description:", todo.description) || todo.description })}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;