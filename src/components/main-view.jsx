import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import logo from "../cmdb-logo.png";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        
          const moviesfromAPI = movies.map((movie) => {
          
            return {
            _id: movie._id,               
          Title: movie.Title,           
          Description: movie.Description, 
          Genre: movie.Genre,      
          Director: movie.Director, 
          Actors: movie.Actors,
          ImageURL: movie.ImageURL
          };
        });
          setMovies(moviesfromAPI);

        
      });
    }, []);

  // if (selectedMovie) {
  //   return (
  //     <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //   );
  // }

  // if (selectedMovie) {
  //   let similarMovies = movies.filter (
  //     (movie) => movie.Genre === selectedMovie.Genre
  //   );
  //   return (
  //     <>
  //     <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //     <hr />
  //     <h3>Similar Movies</h3>
  //     <div className="similar-movies">
  //       {similarMovies.map((movie) => (
  //         <MovieCard key={movie.Title} movie={movie} />
  //       ))}
  //     </div>
  //   </>)}

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) => 
        movie.Genre.Type === selectedMovie.Genre.Type && 
        movie._id !== selectedMovie._id
    );
    const samedirector = movies.filter(
      (movie) =>
        movie.Director.Name === selectedMovie.Director.Name &&
      movie._id !== selectedMovie._id
    );
    
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <div className="main">
        <h2>More movies by {selectedMovie.Director.Name}:</h2>
        <div className="similar">
        {samedirector.length > 0 ? (
          samedirector.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
              />
            ))
          ) : (
            <p>Sorry, currently there are no more movies listed by this director.</p>
          )}
        </div>
        <h2>More {selectedMovie.Genre.Type} movies:</h2>
        <div className="similar">
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          ))
        ) : (
          <p>Sorry, currenctly there are no more movies listed for this genre.</p>
        )}
      </div>
       
        
        
        </div>
      </>
    );
  }

  

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="main">
      <h1>Welcome to </h1>
      <img src={logo} alt="CMDB"/>
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