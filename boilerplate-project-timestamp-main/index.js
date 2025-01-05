// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (Cross-Origin Resource Sharing)
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Default route to serve the index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return a greeting (for testing purposes)
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // If the date parameter exists, try parsing it.
  if (dateParam) {
    // Try to parse the input date
    date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      // If the date is invalid, return error response
      return res.json({ error: "Invalid Date" });
    }
  } else {
    // If no date is provided, use the current date
    date = new Date();
  }

  // Format the Unix timestamp and UTC date
  const unixTimestamp = date.getTime();
  const utcDate = date.toUTCString();

  // Return the JSON response with unix and utc keys
  return res.json({ unix: unixTimestamp, utc: utcDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
