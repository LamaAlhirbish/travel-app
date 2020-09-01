// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const port = 6543;
app.listen(port, function() {
  console.log(`running on http://localhost:${port}`);
});

// app.get('/', function (req, res) {
//   res.sendFile('dist/index.html')
// })

// Send all data to update UI
app.get('/allData', sendData);

function sendData (req, res) {
  res.send(projectData);
}

/* Post routes */
app.post('/tripInfo', tripInfo);

function tripInfo (req, res) {
  let data = req.body;
  projectData.photo = data.photo;
  projectData.country = data.country;
  projectData.departure_date = data.departure_date;
  projectData.HTML_departure_date = data.HTML_departure_date;
  projectData.return_date = data.return_date;
  projectData.city_name = data.city_name;
  projectData.weather_array = data.weather_array;
  projectData.countdown = data.countdown;
  projectData.trip_length = data.trip_length;
  res.send(projectData);
}
