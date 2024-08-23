import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import UserInfo from "./user-info";

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

  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${movieId}`,
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
            favoriteMovies.filter((movie) => movie._id !== movieId)
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
      Username: username,
      Password: password,
      Email: email,
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
    if (window.confirm("Are you sure you want to deregister? This action cannot be undone.")) {
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
    <Card className="profile-view">
      <Card.Body>
        <Card.Title>Profile Information</Card.Title>
        <UserInfo name={user.username} email={user.email} />

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

          <Button variant="info" type="submit" className="me-2">
            Update Profile
          </Button>
          <Button variant="info" onClick={handleDeregister}>
            Delete my account
          </Button>
        </Form>

        <Card.Title>Favorite Movies</Card.Title>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Card key={movie._id} className="mb-2">
              <Card.Body className="d-flex align-items-center">
                <Card.Title>{movie.Title}</Card.Title>
                <Button
                  variant="warning"
                  className="ms-auto"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  Remove from list
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Card.Text>No favorite movies found.</Card.Text>
        )}

        <Button variant="dark" onClick={handleLogout}>
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
};
