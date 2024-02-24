// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://markvilludo:vgx77glPxRBsskWC@cluster0.up6jc5z.mongodb.net/activities?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
