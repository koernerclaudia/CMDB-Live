import React from "react";
import "../../index.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AddRemoveBtn from "../common/addremovebtn";

export const MovieView = ({
  movies,
  getSimilarMovies,
  getMoviesByDirector,
}) => {
  const { MovieID } = useParams();
  const movie = movies.find((movie) => movie._id === MovieID);
  const similarMovies = getSimilarMovies(movie);
  const directorMovies = getMoviesByDirector(movie);

  return (
    <>
      <Card border="info">
        <Card.Body>
          <Row>
            <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={12}>
              <Card border="light" className="margin-bottom">
                <Card.Img
                  variant="top"
                  src={movie.ImageURL}
                  className="main-view-img" alt="Movie Image"
                />
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={12}>
              <Card border="light">
                <Card.Body>
                  <Card.Title style={{ color: "#54B4D3" }}>
                    {movie.Title}
                  </Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>{" "}
                </Card.Body>
                <ListGroup className="list-group-flush" variant="light">
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Actors:</b> {movie.Actors.join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Director:</b> {movie.Director.Name}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ color: "#ffffff" }}>
                    <b>Genre:</b> {movie.Genre.Type} ( {movie.Genre.Description}
                    )
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <br />
              <AddRemoveBtn movieId={MovieID} />
              <br />
              <br />
              <Link to={`/`}>
                <Button variant="warning" className="btn-sm">
                  Back to list of Movies
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className="list-group-flush" variant="light">
          <ListGroup.Item className="margin-top">
            <Row xs={1} md={2} className="g-4">
              <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                {" "}
                <Card border="light margin-bottom">
                  <Card.Body>
                    <Card.Title style={{ color: "white" }}>
                      <h6>
                        More of this genre: {" "}
                        <span style={{ color: "#f6c344" }}>
                          {" "}
                          {movie.Genre.Type}
                        </span>
                      </h6>
                    </Card.Title>
                    {similarMovies.length > 0 ? (
                      <ListGroup variant="flush">
                        {similarMovies.map((similarMovie) => (
                          <ListGroup.Item key={similarMovie._id}>
                            <Link
                              to={`/movies/${similarMovie._id}`}
                              style={{ color: "#f6c344" }}
                            >
                              {similarMovie.Title}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <Card.Text style={{ color: "#ffffff" }}>
                        There are no other movies of the  
                        <span style={{ color: "#f6c344" }}>
                       
                          &nbsp;{movie.Genre.Type}&nbsp;
                        </span>
                        genre listed in this database.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                <Card border="light margin-bottom">
                  <Card.Body>
                    <Card.Title style={{ color: "white" }}>
                      <h6>
                        More movies by director: 
                        <span style={{ color: "#f6c344" }}>
                          &nbsp;{movie.Director.Name}&nbsp;
                        </span>
                      </h6>
                    </Card.Title>
                    {directorMovies.length > 0 ? (
                      <ListGroup variant="flush">
                        {directorMovies.map((directorMovie) => (
                          <ListGroup.Item
                            key={directorMovie._id}
                            style={{ color: "#ffffff" }}
                          >
                            <Link
                              to={`/movies/${directorMovie._id}`}
                              style={{ color: "#f6c344" }}
                            >
                              {directorMovie.Title}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <Card.Text style={{ color: "#ffffff" }}>
                        There are no other movies by
                        <span style={{ color: "#f6c344" }}>
                        &nbsp;{movie.Director.Name}&nbsp;
                        </span>
                        listed in this database.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};