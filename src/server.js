const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let todos = [];

app.get('/todos', (req, res) => {
    const { status } = req.query;
    if (status) {
        return res.json(todos.filter(todo => todo.status === status));
    }
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { name, description } = req.body;
    const newTodo = { id: Date.now(), name, description, status: 'not completed' };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    let todo = todos.find(todo => todo.id == id);
    if (todo) {
        todo.name = name || todo.name;
        todo.description = description || todo.description;
        todo.status = status || todo.status;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});