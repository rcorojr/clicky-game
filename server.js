<<<<<<< HEAD
const express = require("express");
const path = require("path")
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}

app.get("*",(req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/clicky-game");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
=======

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'build');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
>>>>>>> 05ad694555be390dafe60ae520ae809c95cf851b
});
app.listen(port, () => {
   console.log('Server is up!');
}); 