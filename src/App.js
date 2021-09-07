import React, {useState, useEffect} from 'react'
import MoiveList from './Components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';
import { BrowserRouter, Route } from 'react-router-dom';
//import Rating from './Components/Rating.Js';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState(' ')

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=dc23ce49`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if  (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  useEffect (() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    )

    setFavourites(movieFavourites);
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMoive = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }


  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID);
      
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  }

  return (
    <BrowserRouter>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Movies" />
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
          <MoiveList 
          movies={movies} 
          handleFavouritesClick = {addFavouriteMoive} favouriteComponent = {AddFavourites}/>
        </div>
        
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Favourites" />
        </div>
        <div className='row'>
          <MoiveList 
          movies={favourites} 
          handleFavouritesClick = {removeFavouriteMovie} favouriteComponent = {RemoveFavourites}/>
        </div>
      </div>
      // <Route path = '/' component={SearchBox} />
      <Route path = '/movielist' component={MoiveList} />
      <Route path ='/addfavourite' component={AddFavourites} />
    </BrowserRouter>
  );
}

export default App;
