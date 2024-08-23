import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import { LoginView } from "./login-view/login-view";
import { SignupView } from "./signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation} from "./navigation/navigation";
import {ProfileView} from "./profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
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
        setLoading(false); // End loading
      })
      .catch(() => setLoading(false)); // End loading on error
  }, [token]);

  if (loading) {
    return <div className="centered-loading">Loading movies...</div>;
  }

  return (
    <BrowserRouter><Navigation
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
                  <Col md={4} className="d-flex flex-column align-items-center">
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
                  <Col md={4} className="d-flex flex-column align-items-center">
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8} className="d-flex flex-column align-items-center">
                    <MovieView movies={movies} />
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
                      <Col className="mb-4" key={movie._id} md={3}>
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
                <Col md={8}>
                  <ProfileView user={user} token={token} movies={movies} />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
