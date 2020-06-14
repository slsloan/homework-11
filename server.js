// import dependencies 
var express = require("express");

// create an "express" server
var app = express();

// define port where server will listen
var PORT = process.env.PORT || 8080;

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes


// start the server
app.listen(PORT, function () {
    console.log("Server is listening on http://localhost:" + PORT);
});
