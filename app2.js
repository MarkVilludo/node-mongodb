// now,lets import our dependencies for our activity
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes
app.get('/tasks', async(req, res) => {
    try {
        const task = await Task.find();
        res.json(task); 
    } catch(err) {
        res.status(500).json({'error': err.message});
    }
})

const port =  5000;
//start listen to server -- serve our application
app.listen(port, () => {
    console.log(`running on http://localhost: ${port}`)
})

