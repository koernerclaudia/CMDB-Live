import React, { useState, useEffect } from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export const MovieView = ({
  movies,
  getSimilarMovies,
  updateAction,
  getMoviesByDirector,
}) => {
  const { MovieID } = useParams();
  const movie = movies.find((movie) => movie._id === MovieID);
  const [isFavorite, setIsFavorite] = useState(false);
  const similarMovies = getSimilarMovies(movie);
  const directorMovies = getMoviesByDirector(movie);

  useEffect(() => {
    if (movie) {
      setIsFavorite(checkIfFavorite(movie._id));
    }
  }, [MovieID, movie]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(MovieID)) {
      setIsFavorite(true);
    }
  }, [MovieID]);

  const checkIfFavorite = (movieId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.FavoriteMovies && user.FavoriteMovies.includes(movieId);
  };

  const handleAddToFav = async (MovieID) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to add movie to favorites");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(true);
      updateAction(MovieID);
    } catch (error) {
      console.log(
        `An error occurred while adding the movie to favorites: ${error.message}`
      );
    }
  };

  const handleRemoveFromFav = async (MovieID) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to remove movie from favorites");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(false);
      updateAction(MovieID);
    } catch (error) {
      console.log(
        `An error occurred while removing the movie from favorites: ${error.message}`
      );
    }
  };

  return (
    <>
      <Card border="info">
        <Card.Body>
          <Row xs={1} md={2}>
            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
              <Card border="light" className="margin-bottom">
                <Card.Img
                  variant="top"
                  src={movie.ImageURL}
                  className="main-view-img" alt="Movie Image"
                />
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
              <Card border="light">
                <Card.Body>
                  <Card.Title style={{ color: "#54B4D3" }}>
                    {movie.Title}
                  </Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>{" "}
                </Card.Body>
                <ListGroup className="list-group-flush" variant="light">
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Actors:</b> {movie.Actors.join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Director:</b> {movie.Director.Name}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Genre:</b> {movie.Genre.Type} ( {movie.Genre.Description}
                    )
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <br />
              {isFavorite ? (
                <Button
                  className="btn-sm"
                  variant="outline-light"
                  onClick={() => handleRemoveFromFav(movie._id)}
                  alt="Remove from favourites."
                >
                  <FontAwesomeIcon icon={solidHeart} style={{ color: "red" }} />
                  &nbsp;Remove
                </Button>
              ) : (
                <Button
                  className="btn-sm"
                  variant="outline-info"
                  onClick={() => handleAddToFav(movie._id)}
                  alt="Add to favourties."
                >
                  <FontAwesomeIcon icon={regularHeart} />
                  &nbsp;Add to List
                </Button>
              )}

              <br />
              <br />
              <Link to={`/`}>
                <Button variant="warning" className="btn-sm">
                  Back to list of Movies
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className="list-group-flush" variant="light">
          <ListGroup.Item className="margin-top">
            <Row xs={1} md={2} className="g-4">
              <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                {" "}
                <Card border="light margin-bottom">
                  <Card.Body>
                    <Card.Title style={{ color: "white" }}>
                      <h6>
                        More of this genre:{" "}
                        <span style={{ color: "#f6c344" }}>
                          {" "}
                          {movie.Genre.Type}
                        </span>
                      </h6>
                    </Card.Title>
                    {similarMovies.length > 0 ? (
                      <ListGroup variant="flush">
                        {similarMovies.map((similarMovie) => (
                          <ListGroup.Item key={similarMovie._id}>
                            <Link
                              to={`/movies/${similarMovie._id}`}
                              style={{ color: "#f6c344" }}
                            >
                              {similarMovie.Title}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <Card.Text style={{ color: "#ffffff" }}>
                        There are no other movies of the{" "}
                        <span style={{ color: "#f6c344" }}>
                          {" "}
                          {movie.Genre.Type}
                        </span>
                        genre listed in this database.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                <Card border="light margin-bottom">
                  <Card.Body>
                    <Card.Title style={{ color: "white" }}>
                      <h6>
                        More movies by director{" "}
                        <span style={{ color: "#f6c344" }}>
                          {" "}
                          {movie.Director.Name}
                        </span>
                        :
                      </h6>
                    </Card.Title>
                    {directorMovies.length > 0 ? (
                      <ListGroup variant="flush">
                        {directorMovies.map((directorMovie) => (
                          <ListGroup.Item
                            key={directorMovie._id}
                            style={{ color: "#ffffff" }}
                          >
                            <Link
                              to={`/movies/${directorMovie._id}`}
                              style={{ color: "#f6c344" }}
                            >
                              {directorMovie.Title}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <Card.Text style={{ color: "#ffffff" }}>
                        There are no other movies by{" "}
                        <span style={{ color: "#f6c344" }}>
                          {" "}
                          {movie.Director.Name}{" "}
                        </span>
                        listed in this database.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};