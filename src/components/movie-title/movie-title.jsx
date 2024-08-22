import PropTypes from "prop-types";

export const MovieTitle = ({ movie, onMovieClick }) => (
    
  <div className="hover" onClick={() => onMovieClick(movie)}>
    <h4>{movie.Title}</h4>
  </div>
);

  MovieTitle.propTypes = {
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


  