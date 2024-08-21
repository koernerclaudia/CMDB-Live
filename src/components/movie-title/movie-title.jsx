import PropTypes from "prop-types";

export const MovieTitle = ({ movie, onMovieClick }) => (
  <div className="hover" onClick={() => onMovieClick(movie)}>
    <h3>{movie.Title}</h3>
  </div>
);

  MovieTitle.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };