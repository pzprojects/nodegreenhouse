require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(express.json());

app.get("/json", (req, res) => {
    res.json({ message: "Server is up!" });
 });

 app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });
//app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function(req, res, next) {
  const origin = "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Connect to Mongo
mongoose
  .connect(process.env.DB, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));