'use strict';

console.log('our first server');

const express = require('express');

const data = require('./data/weather.json');

require('dotenv').config();

const cors = require('cors');

// const { nextTick } = require('process');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('/weather', (request, response, next) => {
  // let latitude = request.query.lat;
  // let longitude = request.query.lon;
  try{
    let cityName = request.query.city_name;

    let selectedCity = data.find(city => city.city_name === cityName);

    if (selectedCity === undefined){
      throw(500);
    }

    let forecastArr = selectedCity.data.map(day => new Forecast(day));

    response.send(forecastArr);
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('that route does not exist');
});

app.use((err, req, response, next) => {
  response.status(500).send(err.message);
});

class Forecast {
  constructor(forecastDay){
    this.date = forecastDay.valid_date;
    this.description = forecastDay.weather.description;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
