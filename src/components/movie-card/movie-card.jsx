import React from "react";
import "../../index.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import AddRemoveBtn from "../common/addremovebtn";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" border="info">
<Link to={`/movies/${encodeURIComponent(movie._id)}`} key={`${movie._id}-image-link`}>
  <img src={movie.ImageURL} className="cover-img" alt="Movie Image" />
</Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: "#54B4D3" }}>{movie.Title}</Card.Title>
        <Card.Text>
  <b>With:</b>{" "}
  {movie.Actors.map((actor, index) => (
    <span key={`${movie._id}-actor-${index}`}>{actor}{index < movie.Actors.length - 1 ? ", " : ""}</span>
  ))}
</Card.Text>
<Card.Text>
          <b>Directed by:</b> {movie.Director.Name}
        </Card.Text>
        <Row className="mt-auto">
          <Col className="col-6 d-flex justify-content-left align-items-left">
        
<Link to={`/movies/${encodeURIComponent(movie._id)}`} key={`${movie._id}-more-info-link`}>
<div className="mt-auto"><Button className="btn-sm margin-top" variant="warning">
    More info
  </Button></div>
</Link>

          </Col>
          <Col className="col-6 d-flex justify-content-end align-items-center">
          <div className="mt-auto"><AddRemoveBtn movieId={movie._id} key={`${movie._id}-add-remove-btn`} /></div>
          </Col>
        </Row>
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
      Birthyear: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Type: PropTypes.string,
      Description: PropTypes.string,
    }),
    Actors: PropTypes.array,
    ImageURL: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
