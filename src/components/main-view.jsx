import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        
          const moviesfromAPI = data.map((movie) => {
          
            return {
            _id: movie._id,               
          Title: movie.Title,           
          Description: movie.Description, 
          Genre: movie.Genre.Type,      
          Director: movie.Director.Name, 
          Actors: movie.Actors,
          Image: movie.ImageURL
          };
        });
          setMovies(moviesfromAPI);

        
      });
    }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <h1>Welcome to Claudia's Movie Database (cMDB)</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    </div>
  );}