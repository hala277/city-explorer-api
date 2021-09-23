const axios = require('axios');
//  const { query } = require('express');

function getMoviesH (request, response) {
    // response.send('incide test ')
     console.log(request.query);
    // let searchQ = request.query.query;
    // console.log(request.query)
    //  console.log(searchQ2);
    const {query} = request.query;
    //  console.log(queryMovies);
     const MoviesLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`
    //  console.log(MoviesLink);
    //  console.log('before req')

    axios.get(MoviesLink).then(moviesResult => {
        //   console.log(moviesResult);
        //   console.log(moviesResult.data);
    //    console.log(moviesResult);
        let move = moviesResult.data.results.map(info => new Movies(info));
       
        response.send(move);   
       
    })   
    .catch(error =>{
        response.send(error)
    });
}
    // //  console.log('after req')
    class Movies {

        constructor(data){
            // title,overview,vote_average,vote_count,
            // poster_path,popularity,released_on
        //  console.log(data);
            this.title = data.title;
            this.overview = data.overview;
            this.vote_average = data.vote_average;
            this.vote_count = data.vote_count;
            this.poster_path= 'https://image.tmdb.org/t/p/w500' + data.poster_path;
            this.popularity = data.popularity;
            this.release_date = data.release_date;
        }
    } 
    

module.exports = getMoviesH;
