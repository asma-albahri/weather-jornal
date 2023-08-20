// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
const { listeners } = require('process');
// Initialize the main project folder
app.use(express.static('website'));
app.use(cors());
const port = 3001;
// Spin up the server
const server= app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/get", (req,res) =>{
    res.send(projectData);
    console.log(projectData);
})

// Post Route
  app.post('/add', postData)
  function postData(req, res){
    projectData = req.body;
    console.log("req.body" ,req.body);
    console.log("projectData", projectData);
    res.send(projectData);
  }