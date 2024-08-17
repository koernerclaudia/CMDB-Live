import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => (
  <div onClick={() => onMovieClick(movie)}>
    <h3>{movie.Title}</h3>
  </div>
);

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      // Director: PropTypes.shape({
      //   Name: PropTypes.string
      // }),
      // Actors: PropTypes.array,
      // Image: PropTypes.string
      
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };