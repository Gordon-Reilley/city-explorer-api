const axios = require('axios');



let cache = {
  cachedWeather: null,
  weatherTimestamp: null,
  searchedCoordinates: {
    lat: null,
    lon: null
  }
};


let weather = async function (request, response) {

  let timeToTestCache = 1000 * 10;
  let timeRightNow = Date.now();

  let lat = request.query.lat;
  let lon = request.query.lon;

  if (cache && timeRightNow - cache.weatherTimestamp < timeToTestCache && cache.searchedCoordinates[lat] === lat && cache.searchedCoordinates[lon] === lon) {
    console.log('Data stored in cache');
    response.status(200).send(cache.cachedWeather);
  } else {
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;
    let searchQuery = await axios.get(weatherURL);
    let threeDayForecast = searchQuery.data.data.map(day => new Forecast(day));
    threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
    cache.cachedWeather = threeDayForecast;
    cache.weatherTimestamp = Date.now();
    cache.searchedCoordinates[lat] = lat;
    cache.searchedCoordinates[lon] = lon;
  };
};

class Forecast {
  constructor(weatherObj) {
    console.log('weatherObj:', weatherObj);
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description.toLowerCase();
    this.low = weatherObj.low_temp;
    this.high = weatherObj.max_temp;
    this.fullDescription = `Low of ${this.low}, high of ${this.high} with ${this.description}.`;
  }
}

module.exports = weather;
