import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; 


export const MovieView = ({ movies, getSimilarMovies, updateAction, getMoviesByDirector }) => {
  const { MovieID } = useParams();
  const movie = movies.find((movie) => movie._id === MovieID);
  const [isFavorite, setIsFavorite] = useState(false);
  const similarMovies = getSimilarMovies(movie);
  const directorMovies = getMoviesByDirector(movie);

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

  return (
    <>
    <Card style={{ width: '40rem' }} border="warning" >



      
   
    <Card.Body>

    <Row>
<Col> <Card border="light">
        <Card.Img variant="top" src={movie.ImageURL} className="main-view-img"/>
      </Card></Col>
<Col><Card border="light">
        <Card.Body>
        <Card.Title style={{ color: "#f6c344" }}>{movie.Title}</Card.Title>
    <Card.Text>
    {movie.Description}
    </Card.Text> </Card.Body>
    <ListGroup className="list-group-flush" variant="light">
    <ListGroup.Item style={{ color: "#ffffff" }}><b>Actors:</b> {movie.Actors.join(', ')}</ListGroup.Item>  
    <ListGroup.Item style={{ color: "#ffffff" }}><b>Director:</b> {movie.Director.Name}</ListGroup.Item>
    <ListGroup.Item style={{ color: "#ffffff" }}><b>Genre:</b> {movie.Genre.Type} ( {movie.Genre.Description})</ListGroup.Item>
    </ListGroup>
       
      </Card>
      <br />
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
                 <FontAwesomeIcon icon={regularHeart} />&nbsp;Add to List
            </Button>  
          )}

     <br /><br />
      <Link to={`/`}>
        <Button variant="warning" className="btn-sm">Back to list of Movies</Button>
      </Link>
      
      </Col>
</Row>



   
    </Card.Body>
    <ListGroup className="list-group-flush" variant="light">
    <ListGroup.Item className="margin-top">
    <Row>
<Col> <Card border="light">
        <Card.Body>
          <Card.Title style={{ color: "#f6c344" }}><h6>More {movie.Genre.Type} movies:</h6></Card.Title>
          {similarMovies.length > 0 ? (
          <ListGroup variant="flush">
            {similarMovies.map(similarMovie => (
              <ListGroup.Item key={similarMovie._id} style={{ color: "#ffffff" }}>
                <Link to={`/movies/${similarMovie._id}`}>{similarMovie.Title}</Link>
              </ListGroup.Item>
           ))}
           </ListGroup>
         ) : (
           <Card.Text style={{ color: "#ffffff" }}>
             There are no other movies of the {movie.Director.Name} Genre listed in this database.
           </Card.Text>
         )}
        </Card.Body>
      </Card></Col>
<Col><Card border="light">
        <Card.Body>
          <Card.Title style={{ color: "#f6c344" }}><h6>More movies by {movie.Director.Name}:</h6></Card.Title>
          {directorMovies.length > 0 ? (
            <ListGroup variant="flush">
              {directorMovies.map(directorMovie => (
                <ListGroup.Item key={directorMovie._id} style={{ color: "#ffffff" }}>
                  <Link to={`/movies/${directorMovie._id}`}>{directorMovie.Title}</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Card.Text style={{ color: "#ffffff" }}>
              There are no other movies by {movie.Director.Name} listed in this database.
            </Card.Text>
          )}
        </Card.Body>
      </Card></Col>
</Row>




    </ListGroup.Item>


   
    </ListGroup>
    </Card>

  
      
    
    </>

);}
;