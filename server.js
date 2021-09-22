'use strict'

//  const express = require('express');
// creat a variable to use express

const cors = require('cors');
const express = require('express');
require('dotenv').config();
const axios = require('axios')
const axios1 = require('axios')

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

// localhost:3001/getWeather?city=Amman
function getWeatherH(request, response) {
    // response.send('incide test ')
    let searchQ2 = request.query.city;
    console.log(request.query)
    //  console.log(searchQ2);
    

    let weatherLink = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ2}&key=${process.env.KEY}`
    console.log(weatherLink);
    // console.log('before req')

    axios.get(weatherLink).then(weatherResult => {
        // console.log(weatherResult);
        // console.log(weatherResult.data);
        let weatherf = weatherResult.data.data.map(info => {
            return new Forecast(info)
        });
        response.send(weatherf);   
    })   
    .catch(error =>{
        response.send(error)
    });
    
    //  console.log('after req')
   
    
}
//  
// localhost:3001/getMovies?query=Amman
function getMoviesH(request, response) {
    // response.send('incide test ')
    console.log("hiiiiiiiiiiiiiiiiiii")
    let searchQ = request.query.query;
    console.log(request.query)
    //  console.log(searchQ2);
    

     let MoviesLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQ}`
     console.log(MoviesLink);
    //  console.log('before req')

    axios.get(MoviesLink).then(moviesResult => {
        //  console.log(moviesResult);
        //  console.log(moviesResult.data);

        let move = moviesResult.data.results.map(info => {
            return new Movies(info)
        });
        response.send(move);   
    })   
    .catch(error =>{
        response.send(error)
    });
    
    // //  console.log('after req')
   
    
}

function test(request, response) {
    response.send('every thing is working')
}

function notFound(request, response) {
    response.status(404).send('404 not found')
}




//  class
class Forecast {

    constructor(data) {

        this.date = data.datetime;
        this.description = data.weather.description;
    }

}

class Movies {

    constructor(data){
        // title,overview,vote_average,vote_count,
        // poster_path,popularity,released_on
        
        this.title = data.title;
        this.overview = data.overview;
        this.vote_average = data.vote_average;
        this.vote_count = data.vote_count;
        this.poster_path= data.poster_path;
        this.popularity = data.popularity;
        this.release_date = data.release_date;
    }
} 

server.listen(PORT, () => {
    console.log(`PORT is working ${PORT}`)
})
