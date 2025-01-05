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

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // If a date parameter is provided
  if (dateParam) {
    // If the date is a Unix timestamp (number), parse it as an integer
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // If it's not a Unix timestamp, try to parse it as a date string
      date = new Date(dateParam);
    }

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
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
