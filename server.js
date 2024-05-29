const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = 'AIzaSyCL11aP3TtWkykhQm7g4SIUZb_zOVmvkhY';

async function getGeolocation(ip) {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;

  try {
    const response = await axios.post(url, { considerIp: true });
    return response.data.location;
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.use(async (req, res, next) => {
  const ip = req.ip;
  const location = await getGeolocation(ip);

  if (location) {
    const { lat, lng } = location;

    // Allow access only if the user is within the US (example coordinates)
    if (lat >= 24.396308 && lat <= 49.384358 && lng >= -125.0 && lng <= -66.93457) {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  } else {
    res.status(500).send('Unable to determine location.');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, you are allowed to access this website.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
