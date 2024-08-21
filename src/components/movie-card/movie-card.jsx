import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>{movie.ImageURL}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="primary">Go to movie
        </Button>
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