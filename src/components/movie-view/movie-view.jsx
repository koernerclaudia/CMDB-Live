
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <>
     
    <Card style={{ width: '40rem' }}  >
    <Card.Img variant="top" src={movie.ImageURL} className="img-in-view"/>
    <Card.Body>
    <Card.Title>{movie.Title}</Card.Title>
    <Card.Text>
    {movie.Description}
    </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
    <ListGroup.Item>Actors: {movie.Actors.join(', ')}</ListGroup.Item>  
    <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
    <ListGroup.Item>Genre: {movie.Genre.Type} ( {movie.Genre.Description})</ListGroup.Item>
    </ListGroup>
    </Card>
    <Link to={`/`}>
        <Button className="margin-top" variant="info">Back to Movies</Button>
      </Link>
    </>

);}
;