import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import UserInfo from "./user-info";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; 

export const ProfileView = ({ user, token, movies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    if (!user) return;

    // Fetching favorite movies based on user data
    const favMovies = movies.filter((movie) =>
      user.FavoriteMovies.includes(movie._id)
    );
    setFavoriteMovies(favMovies);
  }, [user, movies]);



  const handleRemoveFavorite = (MovieID) => {
    fetch(
      `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Update the favoriteMovies state to remove the movie
          setFavoriteMovies(
            favoriteMovies.filter((movie) => movie._id !== MovieID)
          );
        } else {
          alert("Failed to remove the movie from favorites.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page to trigger logout
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      username: username,
      password: password,
      email: email,
    };

    fetch(`https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully.");

          // Update the local user state with the new values
          const updatedUserResponse = { ...user, username, email };
          // Password is not typically returned by the API, so we should avoid storing it in the state
          setUsername(username);
          setEmail(email);
        } else {
          alert("Failed to update profile.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleDeregister = () => {
    if (
      window.confirm(
        "Are you sure you want to deregister? This action cannot be undone."
      )
    ) {
      fetch(`https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Account deleted successfully.");
            handleLogout();
          } else {
            alert("Failed to delete account.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="profile-view margin-top bg-info">
              <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <UserInfo name={user.username} email={user.email} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="profile-view margin-top">
              <Card.Body>
                <Card.Title>Change your info</Card.Title>
                <Form onSubmit={handleSubmit} className="mb-4">
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Change Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter new username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Change Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter new email"
                    />
                  </Form.Group>

                  <Button
                    variant="info margin-top"
                    type="submit"
                    className="me-2"
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant="danger margin-top"
                    onClick={handleDeregister}
                  >
                    Delete my account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="profile-view margin-top bg-info">
          <Card.Body>
            <Card.Title>Favorite Movies</Card.Title>
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <Card key={movie._id} className="mb-3">
                  <Card.Body className="d-flex align-items-center">
                    <img
                      src={movie.ImageURL}
                      style={{ width: "45px", height: "65px" }}
                    />
                    <Card.Title>&nbsp;&nbsp;{movie.Title}</Card.Title>
                    <Button
                      variant="dark"
                      className="ms-auto btn-sm"
                      onClick={() => handleRemoveFavorite(movie._id)} alt ="Remove from favourites."
                    ><FontAwesomeIcon icon={solidHeart} style={{ color: 'red' }} />&nbsp;Remove from list   
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Card.Text>No favorite movies found.</Card.Text>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
