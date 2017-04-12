var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    index = require('./routes/index.js') // contains routes
    config = require('./config.js'); // contains details

// middleware
app.use(bodyParser.urlencoded({extended: false}));
// database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbURL);
// routes
app.use('/', index);

let port = process.env.PORT || config.port || 3000;
app.listen(port, () => {
  console.log(`Started running on ${port}`);
});
