// Loading data -- import dependencies 
var fs = require("fs");
var data = require("../db/db.json")
var { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    //GET method route
    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    //POST method route
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        newNote.id = uuidv4();

        fs.readFile("db/db.json", "utf8", function (err, data) {
            var data = JSON.parse(data)

            data.push(newNote)
            fs.writeFile("db/db.json", JSON.stringify(data), function (err) {
                if (err) throw err;
                res.end(console.log("A note has been added."));
            });
        });
    });

    //DELETE method route
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", function (err, data) {
            var noteId = req.params.id;
            var noteData = JSON.parse(data);
            noteData = noteData.filter(function (data) {
                if (noteId != data.id) {
                    return true;
                } else {
                    return false;
                };
            });
            fs.writeFile("db/db.json", JSON.stringify(noteData), function (err) {
                if (err) throw err;
                res.end(console.log("A note has been deleted."));
            })
        });

    });

};