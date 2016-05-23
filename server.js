"use strict";
// server.js

    // set up ========================
    var express = require('express');
    var app = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var multer = require('multer');

    // configuration =================

   
    app.use(express.static(__dirname));                   // set the static files location 
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
   // app.use(bodyParser.json({ type: 'application/json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    //Storage definition for incoming file
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, __dirname+'/repo');
        },
        filename: function (req, file, cb) {
                cb(null, file.originalname);
        }
    });

    //Single file api call to multer as only one file gets associated with an incoming request
    var upload = multer({ storage : storage }).single('file');

    // application ------------------------------------------------------------

    //GET requests
    app.get('/index.html', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
        res.sendFile(__dirname + '/index.html');
    });

    //POST requests
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                  res.end("Error occurred while uploading file");
                  console.log("Error occured while uploading file - " );
                  return;
            }
             res.end("File is uploaded");
        });
       
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");




