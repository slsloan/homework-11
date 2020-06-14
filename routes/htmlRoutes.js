// import dependencies 
var path = require("path");

// routes
module.exports = function (app) {
    // get index.html 
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // get notes.html 
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
};