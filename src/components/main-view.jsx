import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import logo from "../cmdb-logo.png";
import { LoginView } from "./login-view/login-view";
import { SignupView } from "./signup-view/signup-view";



export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
      });
  }, [token]);

  // useEffect(() => {
  //   fetch("https://cmdb-b8f3cd58963f.herokuapp.com/movies")
  //     .then((response) => response.json())
  //     .then((movies) => {
        
  //         const moviesfromAPI = movies.map((movie) => {
          
  //           return {
  //           _id: movie._id,               
  //         Title: movie.Title,           
  //         Description: movie.Description, 
  //         Genre: movie.Genre,      
  //         Director: movie.Director, 
  //         Actors: movie.Actors,
  //         ImageURL: movie.ImageURL
  //         };
  //       });
  //         setMovies(moviesfromAPI);

        
  //     });
  //   }, []);


    if (!user) {
      return (
        <div className="main">
        <h1>Welcome to </h1>
        <img src={logo} alt="CMDB"/>
        <h3>Login here:</h3>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      <h3>Signup here:</h3>
        <SignupView />
        </div>
      );
    }

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

  <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>

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