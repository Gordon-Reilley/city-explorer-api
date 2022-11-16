'use strict';

console.log('our first server');

const express = require('express');

const data = require('./data/weather.json');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('/weather', (request, response) => {
  // let latitude = request.query.lat;
  // let longitude = request.query.lon;
  let cityName = request.query.city_name;

  let selectedCity = data.find(city => city.city_name === cityName);
  let filterCity = new City(selectedCity);
  let cityForecast = new Forecast(selectedCity);
  response.send(filterCity);
});

app.get('*', (request, response) => {
  response.send('that route does not exist');
});

class City {
  constructor(cityObject){
    this.lat = cityObject.lat;
    this.lon = cityObject.lon;
    this.city = cityObject.city_name;
    this.date = cityObject.datetime;
    this.description = cityObject.description;
  }
}

class Forecast {
  constructor(forecastObject){
    this.date = forecastObject.datetime;
    this.description = forecastObject.description;
    this.city = forecastObject.city_name;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
