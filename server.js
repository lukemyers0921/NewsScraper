// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var cheerio = require("cheerio");
var request = require("request");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Require all models
var db = require("./models");

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScrapper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/htmlRoutes.js")(app);
require("./routes/headlineRoutes.js")(app);
require("./routes/scrapedRoutes.js")(app);
require("./routes/noteRoutes.js")(app);


// =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
