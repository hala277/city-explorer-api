'use strict'

//  const express = require('express');
// creat a variable to use express

const cors = require('cors');
const express = require('express');
require('dotenv').config();      
// dotenv should be in line two all the time
const axios = require('axios')

// Modules
const getMoviesH  = require('./modules/movies') 
const getWeatherH = require('./modules/weather')

// try to inti the server here so it will be have properities and methods in express
const server = express();
const PORT = process.env.PORT;
server.use(cors());
//  const weatherData = require('./data/weather.json')



// Routes
server.get('/', home);
server.get('/getWeather', getWeatherH)
server.get('/getMovies', getMoviesH)
server.get('/test', test);
server.get('*', notFound);


// Function Handlers
function home(request, response) {

    response.status(200).send('home route')

}


function test(request, response) {
    response.send('every thing is working')
}

function notFound(request, response) {
    response.status(404).send('404 not found')
}



server.listen(PORT, () => {
    console.log(`PORT is working ${PORT}`)
})
