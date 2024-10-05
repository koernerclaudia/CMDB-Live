import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import { LoginView } from "./login-view/login-view";
import { About } from "./about-view/about";
import { SignupView } from "./signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./navigation/navigation";
import { ProfileView } from "./profile-view/profile-view";
import Form from "react-bootstrap/Form";
import ScrollToTop from './common/scrolltotop'; // Import the ScrollToTop component

import "../index.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [genreFilter, setGenreFilter] = useState("all");
  
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

  const updateAction = (MovieID) => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (updatedUser.FavoriteMovies.includes(MovieID)) {
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter(
        (id) => id !== MovieID
      );
    } else {
      updatedUser.FavoriteMovies.push(MovieID);
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
      .filter((g) => g.Genre.Type === movie.Genre.Type && g._id !== movie._id)
      .slice(0, 10);
  };

  const getMoviesByDirector = (movie) => {
    return movies
      .filter(
        (d) => d.Director.Name === movie.Director.Name && d._id !== movie._id
      )
      .slice(0, 10);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const getUniqueGenres = () => {
    const genres = movies.map((movie) => movie.Genre.Type);
    return ["all", ...new Set(genres)];
  };

  const sortAndFilterMovies = () => {
    let result = [...filteredMovies];

    // Apply genre filter
    if (genreFilter !== "all") {
      result = result.filter((movie) => movie.Genre.Type === genreFilter);
    }

    // Apply sorting
    if (sortOrder === "aToZ") {
      result.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortOrder === "zToA") {
      result.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    return result;
  };

  const sortedAndFilteredMovies = sortAndFilterMovies();

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
        <ScrollToTop />
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
            className="align-items-center w-100">
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
            className="align-items-center w-100">
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
  
  {/* Updated About Route */}
  <Route
    path="/about"
    element={ 
    <Col md={12}>
      <About />
      </Col>} // Accessible by both logged in and logged out users
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
          <Col
            md={12}
            className="d-flex flex-column align-items-center"
          >
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
            <Row className="mx-auto mb-3 justify-content-center algin-content-center w-100">
              <Col md={6} sm={6} xs={12} className="mx-auto margin-top d-flex justify-content-center">
                <Form.Control
                  className="placeholder custom-select"
                  noValidate
                  style={{ color: "white" }}
                  type="text"
                  placeholder="Search by movie title, genre, actor or director"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
              <Col md={3} sm={3} xs={6} className="mx-auto margin-top justify-content-center d-flex">
                <Form.Select
                  className="placeholder custom-select"
                  onChange={handleSortChange}
                  value={sortOrder}
                >
                  <option value="default">Sort by...</option>
                  <option value="aToZ">A to Z</option>
                  <option value="zToA">Z to A</option>
                </Form.Select>
              </Col>
              <Col md={3} sm={3} xs={6} className="mx-auto margin-top justify-content-center d-flex">
                <Form.Select
                  className="placeholder custom-select"
                  onChange={handleGenreChange}
                  value={genreFilter}
                >
                  {getUniqueGenres().map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === "all" ? "All Genres" : genre}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            {sortedAndFilteredMovies.length === 0 ? (
              <Col lg={6} md={6} sm={12} xs={12} className="mx-auto">
                <p style={{ color: "white" }}>
                  Sorry, no movies found matching your criteria.
                </p>
              </Col>
            ) : (
              sortedAndFilteredMovies.map((movie) => (
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
