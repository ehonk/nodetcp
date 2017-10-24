
// set up ======================================================================
var express = require('express');
var app = express(); // create our app w/ express
var port = process.env.PORT || 8080;                // set the port
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)

var apptcp = require('./apptcp'); 


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', function (req, res) {       // This will load the single index.html file when we hit localhost:8080
    console.log("< Info > GET Slash Call");
    res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.post('/json_request', apptcp.json_request);
app.post('/TCP_OneFunction', apptcp.TCP_OneFunction);
app.post('/TCP_FrameFunction', apptcp.TCP_FrameFunction);



// listen (start app with node server.js) ======================================
if (!module.parent) {
    app.listen(3000);
    console.log('++++++++++++++++  node server running +++++++++++++++++++');
    console.log("App listening on port 3000");
    console.log("< Info > NodeJS Version: " + process.version);
  }

