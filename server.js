var express = require('express');
var swig    = require('swig');

var app = module.exports = express();

// Configure Express.js

app.engine('swig', swig.renderFile);

app.configure(function configure(){
  app.set('view engine', 'swig');
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function configureDevelopment(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function configureProduction(){
  app.use(express.errorHandler()); 
});

// Bring in Routes

require('./routes')(app);

app.listen(process.env.PORT, function appListenCallback() {
    console.log("Express server listening on port %d in %s mode",
      process.env.PORT, app.settings.env);
});
