//LOAD DATA
const fs = require("fs");
const data = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');

//-------------------------------------------
//ROUTING
//-------------------------------------------
module.exports = function (app) {
    //GET method route
    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    //POST method route
    app.post("/api/notes", function (req, res) {
        //set the value of the new note to equal the body of the request
        var newNote = req.body;
        //add an id (that is equal to the length of the array of notes) to the note object
        newNote.id = uuidv4();
        console.log(data)
        //read the data file that contains the notes
        fs.readFile("db/db.json", "utf8", function (err, data) {
            //parse the data
            var data = JSON.parse(data)
            console.log(data)
            console.log(newNote)
            //add the new note to the array
            data.push(newNote)
            //wirte the new array containing the new note to the data file
            fs.writeFile("db/db.json", JSON.stringify(data), function (err) {
                if (err) throw err;
                res.end(console.log("note added"));
            });
        });
    });

    //DELETE method route
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", function (err, data) {
            let noteId = req.params.id;
            let noteData = JSON.parse(data);
            noteData = noteData.filter(function (data) {
                if (noteId != data.id) {
                    return true;
                } else {
                    return false;
                };
            });
            fs.writeFile("db/db.json", JSON.stringify(noteData), function (err) {
                if (err) throw err;
                res.end(console.log("note deleted"));
            })
        });

    });

};