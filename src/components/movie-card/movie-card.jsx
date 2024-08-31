import React, { useState, useEffect } from "react";
import "../../index.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export const MovieCard = ({ movie, updateAction }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const MovieID = movie._id;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(MovieID)) {
      setIsFavorite(true);
    }
  }, [MovieID]);

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
      alert('Movie added to your favorite list successfully!');
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
      alert("Movie removed from your favorite list successfully!");
    } catch (error) {
      console.log(
        `An error occurred while removing the movie from favorites: ${error.message}`
      );
    }
  };

  return (
    <Card className="h-100" border="info">
      <div> <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <img src={movie.ImageURL} className="cover-img" alt="Movie Image"/>
        </Link>
      </div>
      <Card.Body>
        <Card.Title style={{ color: "#54B4D3" }}>{movie.Title}</Card.Title>
        <Card.Text>
          <b>With:</b> {movie.Actors.join(", ")}
        </Card.Text>
        <Card.Text>
          <b>Directed by:</b> {movie.Director.Name}
        </Card.Text>
        <Row>
          <Col className="col-6 d-flex justify-content-left align-items-left">
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button className="btn-sm margin-top" variant="warning">
                More info
              </Button>
            </Link>
          </Col>
          <Col className="col-6 d-flex justify-content-right align-items-right">
            {isFavorite ? (
              <Button
                className="btn-sm margin-top"
                variant="outline-light"
                onClick={() => handleRemoveFromFav(movie._id)}
                alt="Remove from favourites."
              >
                <FontAwesomeIcon icon={solidHeart} style={{ color: "red" }} />
                &nbsp;Remove
              </Button>
            ) : (
              <Button
                className="btn-sm margin-top"
                variant="outline-info"
                onClick={() => handleAddToFav(movie._id)}
                alt="Add to favourties."
              >
                <FontAwesomeIcon icon={regularHeart} />
                &nbsp;Add to list
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Birthyear: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Actors: PropTypes.array.isrequired,
    ImageURL: PropTypes.string.isrequired,
    _id: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired, // New prop type
};