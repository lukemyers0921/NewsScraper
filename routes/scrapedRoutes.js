var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");
var results = [];
request("http://www.nytimes.com", function (error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $("article.story").each(function (i, element) {

        var title = $(element).children(".story-heading ").text();
        var link = $(element).children(".story-heading").children("a").attr("href");
        var body = $(element).children(".byline").text();
        // Save these results in an object that we'll push into the results array we defined earlier
        if (title != undefined && body != "" && link != undefined) {
          results.push({
            title: title,
            link: link,
            body: body
          });
        }
        
      });
    });
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.post("/api/Scraped", function (res) {
      for(i = 0;i < results.length; i++){
        db.Scraped.create(results[i]).catch(function(err) {
          // If an error occurred, send it to the client
          console.log(err);
        });
      }
  });
  // authors route loads author-manager.html
  app.get("/api/Scraped", function (req, res) {
    db.Scraped.find({})
      .then(function (dbScraped) {
        // If we were able to successfully find Scrapeds, send them back to the client
        res.json(dbScraped);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  app.delete("/api/Scraped", function (req, res) {
    db.Scraped.find().remove().then(function (Scraped) {
      res.json(Scraped);
    });
  });
};