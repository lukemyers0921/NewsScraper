var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var HeadlineSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  body: String,
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = Headline;