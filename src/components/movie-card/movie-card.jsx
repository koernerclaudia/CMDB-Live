import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => (
  <div className="hover" onClick={() => onMovieClick(movie)}>
    <h3>{movie.Title}</h3>
  </div>
);

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
      ImageURL: PropTypes.string,
      _id: PropTypes.string,
      
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };