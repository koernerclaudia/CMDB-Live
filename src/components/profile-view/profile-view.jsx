import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import UserInfo from "./user-info";

export const ProfileView = ({ user, token, movies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Card className="profile-view">
      <Card.Body>
        <Card.Title>Profile Information</Card.Title>
        <UserInfo name={user.username} email={user.email} />
        <Card.Title>Favorite Movies</Card.Title>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Card key={movie._id} className="mb-2">
              <Card.Body className="d-flex align-items-center">
                <Card.Title>{movie.Title}</Card.Title>
                <Button
                  variant="danger"
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

        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
};
