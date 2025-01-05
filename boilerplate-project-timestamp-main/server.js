const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (dateParam) {
    date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  } else {
    date = new Date();
  }

  const unixTimestamp = date.getTime();
  const utcDate = date.toUTCString();

  return res.json({ unix: unixTimestamp, utc: utcDate });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
