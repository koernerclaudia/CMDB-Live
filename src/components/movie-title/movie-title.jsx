import PropTypes from "prop-types";
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

export const MovieTitle = ({ movie, onMovieClick }) => (
  <div className="hover" onClick={() => onMovieClick(movie)}>
     <h4>{movie.Title}</h4>
    {/* <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>{movie.Title}</ListGroup.Item>
       
      </ListGroup>
    </Card> */}
  </div>
);

  MovieTitle.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };