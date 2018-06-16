var db = require("../models");

module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    app.post("/api/Note", function(req, res) {
        db.Note.create(req.body).then(function(Note) {
          res.json(Note);
        }).catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
      });
    // authors route loads author-manager.html
    app.get("/api/Note/:title", function(req, res) {
        db.Note.find({title: req.params.title})
          .then(function(dbNote) {
            // If we were able to successfully find Notes, send them back to the client
            res.json(dbNote);
          })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });

    app.delete("/api/Note/:title/:body", function(req, res) {
        db.Note.findOneAndRemove({title: req.params.title,body: req.params.body}).then(function(Note) {
          res.json(Note);
        });
      });
  
  };