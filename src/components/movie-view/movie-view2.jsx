import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { MovieTitle } from "../movie-title/movie-title";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; 


export const MovieView = ({ movies, updateAction }) => {
  const { MovieID } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movie = movies.find((movie) => movie._id === MovieID);
  const [isFavorite, setIsFavorite] = useState(false);
  // const MovieID = movie._id;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(MovieID)) {
      setIsFavorite(true);
    }
  }, [MovieID]);

  const handleAddToFav = async (MovieID) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error('Failed to add movie to favorites');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error('Failed to remove movie from favorites');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsFavorite(false);
      updateAction(MovieID);
      alert('Movie removed from your favorite list successfully!');
    } catch (error) {
      console.log(
        `An error occurred while removing the movie from favorites: ${error.message}`
      );
    }
  };

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
    <Card style={{ width: '40rem' }} border="warning" >
    <Card.Img variant="top" src={movie.ImageURL} className="img-in-view"/>
    <Card.Body>
    <Card.Title style={{ color: "#f6c344" }}>{movie.Title}</Card.Title>
    <Card.Text>
    {movie.Description}
    </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush" variant="light">
    <ListGroup.Item style={{ color: "#ffffff" }}>Actors: {movie.Actors.join(', ')}</ListGroup.Item>  
    <ListGroup.Item style={{ color: "#ffffff" }}>Director: {movie.Director.Name}</ListGroup.Item>
    <ListGroup.Item style={{ color: "#ffffff" }}>Genre: {movie.Genre.Type} ( {movie.Genre.Description})</ListGroup.Item>
   
    <ListGroup.Item style={{ color: "#ffffff" }}>More movies by {movie.Director.Name}
      
    <div className="similar">
        {samedirector.length > 0 ? (
          samedirector.map((movie) => (
            <MovieTitle
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
              />
            ))
          ) : (
            <p>Sorry, currently there are no more movies listed by this director.</p>
          )}
        </div>
      
      
      </ListGroup.Item>  
    <ListGroup.Item style={{ color: "#ffffff" }}>More {movie.Genre.Type} Movies:
      
    <div className="similar">
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <MovieTitle
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          ))
        ) : (
          <p>Sorry, currenctly there are no more movies listed for this genre.</p>
        )}
      </div>
      
      
      </ListGroup.Item>  
    <ListGroup.Item style={{ color: "#ffffff" }}>
      <Row><Col className="col-12 d-flex justify-content-center align-items-right">
    {isFavorite ? (
            <Button  
              className="btn-sm" variant="outline-warning"
              onClick={() => handleRemoveFromFav(movie._id)}
              alt ="Remove from favourites.">
            <FontAwesomeIcon icon={solidHeart} style={{ color: 'red' }} />&nbsp;Remove from list
            </Button>
          ) : (
            <Button 
              className="btn-sm" variant="outline-warning"
              onClick={() => handleAddToFav(movie._id)}
            alt ="Add to favourties.">
                 <FontAwesomeIcon icon={regularHeart} />&nbsp;Add to list
            </Button>  
          )}&nbsp;&nbsp; 

<Link to={`/`}>
        <Button variant="warning" className="btn-sm">Back to list of Movies</Button>
      </Link> </Col></Row>
    </ListGroup.Item>
    </ListGroup>
    </Card><br />
    
    </>

);}
;}