import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import logo from "../cmdb-logo.png";
import { LoginView } from "./login-view/login-view";
import { SignupView } from "./signup-view/signup-view";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
 
    setLoading(true); // Start loading
    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        setLoading(false); // End loading
 
      }) .catch(() => setLoading(false)); // End loading on error
    }, [token]);

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

  if (loading) {
    return <div className="centered-loading">Loading movies...</div>;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  

  return (
    <div className="main">
     
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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>    </div>
  );}