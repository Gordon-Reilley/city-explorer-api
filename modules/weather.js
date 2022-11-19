const axios = require('axios');


async function getWeather (request, response, next) {
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
}

class Forecast {
  constructor(forecast){
    this.date = forecast.datetime;
    this.description = `Low of: ${forecast.low_temp} High of: ${forecast.high_temp} with ${forecast.weather.description}`;
  }
}


module.exports = getWeather;
