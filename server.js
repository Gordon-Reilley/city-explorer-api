'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('/weather', async (request, response, next) =>{
  try{
    let lat = request.query.lat;
    let lon = request.query.lon;

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`;
    let newWeather = await axios.get(weatherURL);

    let cities = newWeather.data.data.map(eachDateObj => new Forecast(eachDateObj));

    response.send(cities);
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
  constructor(forecast){
    this.date = forecast.datetime;
    this.description = `Low of: ${forecast.low_temp} High of: ${forecast.high_temp} with ${forecast.weather.description}`;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
