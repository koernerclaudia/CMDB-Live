import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" border="info" bg-white>
      <div><img src={movie.ImageURL} className="cover-img"/></div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>With: {movie.Actors.join(', ')}
        </Card.Text>
        <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="margin-top" variant="info">More info</Button>
        </Link>
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
      Birthyear: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Actors: PropTypes.array.isrequired,
    ImageURL: PropTypes.string.isrequired,
    _id: PropTypes.string,
    
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};