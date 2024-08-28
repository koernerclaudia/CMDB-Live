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
import Form from "react-bootstrap/Form";
import "../index.scss";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    if (!movie) return false;
    const searchTermLower = searchTerm.toLowerCase();

    // Check if any actor's name includes the search term
    const actorMatch =
      movie.Actors &&
      Array.isArray(movie.Actors) &&
      movie.Actors.some((actor) =>
        actor.toLowerCase().includes(searchTermLower)
      );

    return (
      (movie.Title && movie.Title.toLowerCase().includes(searchTermLower)) ||
      (movie.Genre &&
        movie.Genre.Type &&
        movie.Genre.Type.toLowerCase().includes(searchTermLower)) ||
      (movie.Director &&
        movie.Director.Name &&
        movie.Director.Name.toLowerCase().includes(searchTermLower)) ||
      actorMatch
    );
  });

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

  if (loading) {
    return <div className="centered-loading">Loading movies...</div>;
  }

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
                    xs={12}
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
                    md={4}
                    xs={12}
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
                    <Row className="mb-3">
                      <Col md={6} sm={6} xs={12} className="mx-auto">
                        <Form.Control className="placeholder"
                          noValidate
                          style={{ color: "white" }}
                          type="text"
                          placeholder="Search by movie title, genre, actor or director"
                          value={searchTerm}
                          aria-describedby="inputGroupPrepend"
                          onChange={handleSearch}
                        />
                      </Col>
                    </Row>
                    {filteredMovies.length === 0 ? (
                      <Col md={6} className="mx-auto">
                        <p
                          style={{
                            color: "white",
                          }}
                        >
                          Sorry, no movies found matching your search.
                        </p>
                      </Col>
                    ) : (
                      filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={4} xs={12}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))
                    )}
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
