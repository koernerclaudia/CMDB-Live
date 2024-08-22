import React from 'react';
import PropTypes from 'prop-types';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

export const MovieTitle = ({ movie, onMovieClick }) => (
  <div onClick={() => onMovieClick(movie)}>
      <h5>{movie}</h5>
     
  </div>
);

MovieTitle.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};