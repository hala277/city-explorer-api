'use strict'

//  const express = require('express');
// creat a variable to use express
require('dotenv').config();
const cors = require('cors');
const express = require('express');

// try to inti the server here so it will be have properities and methods in express
const server = express();
const weatherData = require('./data/weather.json')

const PORT = process.env.PORT;
// server.use(cors());

// make another localhost with/
server.get('/', (request, response) => {

    // always call the response here
    // status(200) to add ok and if its not working i shold change the PORT
    response.status(200).send('home route')

})

// handell the request from the clinet
//  localhost:3001/test
server.get('/test', (request, response) => {
    response.send('every thing is working')
})


//  localhost:3001/weather?city=Amman
// for  weather server


server.get('/weather', (request, response) => {
    //   response.send(weatherData);

    let searchQuery = request.query.city;

    
    let weatherInfo = weatherData.find((item) => {

        if (item.city_name === searchQuery) {
            return item;
        }


    });

    
   

    let weatherf = weatherInfo.data.map(info => new Forecast
        (`date: ${info.datetime}`,
            `description:  low of ${info.low_temp},high of ${info.max_temp} with ${info.weather.description} `));
    console.log(weatherf);
    response.send(weatherf);

   

})




server.get('*', (request, response) => {
    response.status(404).send('404 not found')
})

server.listen(PORT, () => {
    console.log(`PORT is working ${PORT}`)
})

class Forecast {

    constructor(date, description) {

        this.date = date;
        this.description = description;
    }

}
