const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

//collection name "tasks" it will convert as plural
module.exports = mongoose.model('task', taskSchema);