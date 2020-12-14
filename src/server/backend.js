const express = require('express');
const path = require('path');
const app = express();

var _id = 100

let TASKS_1 = [],
TASKS_3 = [],
TASKS_7 = []



app.use(express.json())

app.get('/api/tasks', (req, res) => {
    res.status(200).json(TASKS_1)
})

app.post('/api/tasks', (req, res) =>{
    console.log(req, res, 'res');
    const task_1 = {...req.body, id: _id++}
    TASKS_1.push(task_1)

    res.status(201).json(task_1)
})

app.delete('/api/tasks/:id', (req, res) => {
    TASKS_1 = TASKS_1.findIndex(c => c.id !== req.params.id)
    res.status(200).json({message: 'Contact be deleted'})
})

app.use(express.static(path.resolve(__dirname, '../../src')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

app.listen(7777, () => console.log('Server has been started on port 777'))