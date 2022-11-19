'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const app = express();

const getWeather = require('./modules/weather');

const getMovies = require('./modules/movies');

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', getWeather);

app.get('/movie', getMovies);

app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('*', (request, response) => {
  response.send('that route does not exist');
});

app.use((err, req, response) => {
  response.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
