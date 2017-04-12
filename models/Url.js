var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UrlSchema = new Schema ({
    id: {
      type: String,
      unique: true
    },
    to: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model("Url", UrlSchema);
