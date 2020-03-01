const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyparser.json());

app.get("/json", (req, res) => {
    res.json({ message: "Server is up!" });
 });

 app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });
//app.use(express.static(path.join(__dirname, 'client/build')));

// DB Config
//const db = require('./config/keys').mongoURI;

// Connect to Mongo
// mongoose
//   .connect(db, { 
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }) // Adding new mongo url parser
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

// Use Routes
//app.use('/api/items', require('./routes/api/items'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));