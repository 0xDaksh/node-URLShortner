var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    index = require('./routes/index,js') // contains routes
    config = require('./config.js'); // contains details

// middleware
app.use(bodyParser.urlencoded({extended: false}));
// database
mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbUrl}`);
// routes
app.use('/', index);

app.listen(config.port, () => {
  console.log(`Started running on ${config.port}`);
});
