const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=imperial&appid=${process.env.APIKEY}`;
  request(url, (err, response, body) => {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weather = JSON.parse(body);
      if (weather.main === undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(3000, () => {
});
