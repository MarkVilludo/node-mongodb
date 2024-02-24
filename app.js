// app.js
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
const db = require('./db');
const path = require('path'); // Added for path module
//is creating an instance of the Express.js application
//it's a common practice to use the app variable to represent the Express application
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// HTML Rendering Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/tasks/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'create.html'));
});

app.get('/tasks/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit.html'));
});

//API Routes
// Create Task
//Async functions allow the use of await inside them.
//An async function always returns a Promise, either resolved with the function's return value,
//or rejected with an exception thrown in the function.
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    //to pause the execution and wait for
    //the Promise (specific actions ex. save()) to resolve before moving on to the next line of code.
    //It can only be used within an async function.
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    //bad request. indicates that the server cannot process the request.
    res.status(400).json({ message: err.message });
  }
});

// Read All Tasks
app.get('/tasks', async (req, res) => {
    try {
        //get all tasks in the database
        // await meaning, it wait the find function before to proceed to the next line.
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
})

// Read Single Task
app.get('/tasks/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Update Task
app.patch('/tasks/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.completed != null) {
    res.task.completed = req.body.completed;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Task
app.delete('/tasks/:id', getTask, async (req, res) => {
  try {
    await Task.deleteOne({ _id: res.task._id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Ensure that res.task is an instance of the Task model
        res.task = task;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const port = 3000;
// Start the Express server
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});