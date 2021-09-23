
const axios = require('axios');

// localhost:3001/getWeather?city=Amman
function getWeatherH(request, response) {
    // response.send('incide test ')
    console.log(request.query)
    // let searchQ2 = request.query.city;
    const {city} = request.query;
    console.log(request.query)
    //  console.log(searchQ2);
    

    let weatherLink = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.KEY}`
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
class Forecast {

    constructor(data) {

        this.date = data.datetime;
        this.description = data.weather.description;
        this.low_temp = data.low_temp;
        this.max_temp = data.max_temp;
    }

}
module.exports = getWeatherH;