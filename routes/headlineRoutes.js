var db = require("../models");

module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    app.post("/api/headline", function(req, res) {
        db.Headline.create(req.body).then(function(headline) {
          res.json(headline);
        }).catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
      });
    // authors route loads author-manager.html
    app.get("/api/headline", function(req, res) {
        db.Headline.find({})
          .then(function(dbHeadline) {
            // If we were able to successfully find Headlines, send them back to the client
            res.json(dbHeadline);
          })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });

    app.delete("/api/headline/:title", function(req, res) {
        db.Headline.findOneAndRemove({title: req.params.title}).then(function(headline) {
          res.json(headline);
        });
      });
  
  };