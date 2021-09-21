'use strict'

//  const express = require('express');
// creat a variable to use express

const cors = require('cors');
const express = require('express');
require('dotenv').config();
const axios = require('axios')
// try to inti the server here so it will be have properities and methods in express
const server = express();
const PORT = process.env.PORT;
server.use(cors());
// const weatherData = require('./data/weather.json')









// const weatherData = require('./data/weather.json')




// make another localhost with/
// server.get('/', (request, response) => {

//     // always call the response here
//     // status(200) to add ok and if its not working i shold change the PORT
//     response.status(200).send('home route')

// })

// handell the request from the clinet
//  localhost:3001/test
// server.get('/test', (request, response) => {
//     response.send('every thing is working')
// })


//  localhost:3001/weather?city=Amman
// for  weather server
// server.get('/weather', (request, response) => {
//     //   response.send(weatherData);

//     let searchQuery = request.query.city;



//     let weatherInfo = weatherData.find((item) => {
//         if (item.city_name === searchQuery) {
//             return item;
//         }

//     })


//     let weatherf = weatherInfo.data.map(info => new Forecast
//         (`date: ${info.datetime}`,
//             `description:  low of ${info.low_temp},high of ${info.max_temp} with ${info.weather.description} `));
//     console.log(weatherf);
//     response.send(weatherf);


// })

// new code here
// things i need to add to my code
//  i have to sabreate  routes and function handlers
//  i need to use axios ,"npm i axios" don't forget async,await with it or just using then 
//  what should the req look like localhous:3001/weather?city= &key




// Routes
server.get('/', home);
server.get('/getWeather', getWeather)
server.get('/test', test);
server.get('*', notFound);


// Function Handlers
function home(request, response) {

    response.status(200).send('home route')

}

// localhost:3001/getWeather?searchQ=Amman
function getWeather(request, response) {
    response.send('incide test ')
    let searchQ2 = request.query.searchQ;
    // i need key,city name,Weather station ID
    // key = 14f0d4e856674b01b84e102604cb999d
    // url http://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=API_KEY
    // days=[integer] up to 16 days but i only need 3
    // city_name
    // data. datetime
    // data.min_temp,data.max_temp,data.weather.description

    let weatherLink = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ2}&key=14f0d4e856674b01b84e102604cb999d`
    console.log(weatherLink);
    console.log('before req')

    axios
    .get(weatherLink).then(weatherResult => {
        console.log('incide req');
        let weatherf = weatherResult.data.result.map(info => {
            return new Forecast(info)
        })
        response.send(weatherf)   
    })   
    .catch(error =>{
        response.send(error)
    }) 
    
    console.log('after req')
   
    
   
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

//  class
class Forecast {

    constructor(data) {

        this.date = data.date;
        this.description = data.description;
    }

}
