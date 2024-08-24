import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, user, onMovieAdded }) => {

  const addToFavorites = async (movieID) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage
      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${movieID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add movie to favorites');
      }

      const updatedUser = await response.json();
      onMovieAdded(updatedUser); // Update the UI or notify the user
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      alert('Failed to add movie to favorites. Please try again.');
    }
  };

  
  return (
    <Card className="h-100 bg-white" border="info" >
      <div><img src={movie.ImageURL} className="cover-img" style={{ zIndex: '-2' }}/></div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>With: {movie.Actors.join(', ')}
        </Card.Text>
        <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="margin-top" variant="info">More info</Button>
        </Link>
        <button onClick={() => addToFavorites(movie._id)}>
        Add to Favorites
      </button>
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
  onMovieClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired // New prop type
};