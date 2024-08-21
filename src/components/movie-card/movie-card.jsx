import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" border="info" bg-white>
      <Card.Img variant="top" src={movie.ImageURL} className="cover-img"/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>With: {movie.Actors.join(', ')}
        </Card.Text>
        <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
        <Button variant="primary" onClick={() => onMovieClick(movie)}>More info</Button>
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
      ImageURL: PropTypes.string,
      _id: PropTypes.string,
      
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };