import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import { LoginView } from "./login-view/login-view";
import { SignupView } from "./signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./navigation/navigation";
import { ProfileView } from "./profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
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
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <div className="centered-loading">Loading movies...</div>;
  }

  const getSimilarMovies = (movie) => {
    return movies
      .filter((m) => m.Genre.Type === movie.Genre.Type && m._id !== movie._id)
      .slice(0, 10);
  };

  const getMoviesByDirector = (movie) => {
    return movies
      .filter(
        (m) => m.Director.Name === movie.Director.Name && m._id !== movie._id
      )
      .slice(0, 10);
  };

  const updateAction = (movieId) => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (updatedUser.FavoriteMovies.includes(movieId)) {
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter(
        (id) => id !== movieId
      );
    } else {
      updatedUser.FavoriteMovies.push(movieId);
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <BrowserRouter>
      <Navigation
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    md={4}
                    xs={1}
                    className="d-flex flex-column align-items-center"
                  >
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    xs={1}
                    md={4}
                    className="d-flex flex-column align-items-center"
                  >
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:MovieID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8} className="d-flex flex-column align-items-center">
                    <MovieView
                      movies={movies}
                      getSimilarMovies={getSimilarMovies}
                      getMoviesByDirector={getMoviesByDirector}
                      updateAction={updateAction}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie._id}
                        xxl={4}
                        xl={4}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/myprofile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={12}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    updateAction={updateAction}
                  />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
