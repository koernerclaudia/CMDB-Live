import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import UserInfo from "./user-info";
import { Link } from "react-router-dom";
import "../../index.scss";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

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
        return response.json();
      } else {
        alert("Failed to remove the movie from favorites.");
      }
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
};

const handleSubmit = (event) => {
  event.preventDefault();

  // const updateUser = {
  //   username: username,
  //   password: password,
  //   email: email,
  // };

  const updateUser = {};

  // Conditionally add fields if they are provided (not empty or unchanged)
  if (username.trim() !== "") {
    updateUser.username = username;
  }
  if (password.trim() !== "") {
    updateUser.password = password;
  }
  if (email.trim() !== "") {
    updateUser.email = email;
  }

  // Check if at least one field is updated
  if (Object.keys(updateUser).length === 0) {
    alert("Please update at least one field.");
    return;
  }

  fetch(`https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser),
  })

  .then((response) => {
    if (response.ok) {
      return response.json(); // Get the updated user data from the response
    } else {
      throw new Error('Failed to update profile.');
    }
  })

  .then((updatedUser) => {
    // Update the user state with the new values
    setUsername(updatedUser.username);
    setEmail(updatedUser.email);

    // Update localStorage with the new user details
    localStorage.setItem('user', JSON.stringify(updatedUser));

    alert("Profile updated successfully.\n (Changes to the password will not be displayed.)");
    window.location.reload();
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  });
};


//     .then((response) => {
//       if (response.ok) {
//         localStorage.setItem('user', JSON.stringify(updateUser));
//         alert("Profile updated successfully.");
//       };
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("An error occurred. Please try again.");
//     });
// };




  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
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
            window.location.href = "/signup";
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
      <Row>
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card className="profile-view margin-top bg-altdark" border="info">
            <Card.Body>
              <Card.Title style={{ color: "#54B4D3" }}>
                Profile Information
              </Card.Title>
              <br />
              <div className="display-8" style={{ color: "#ffffff" }}>
                <UserInfo name={user.username} email={user.email} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card className="profile-view margin-top" border="info">
            <Card.Body>
              <Card.Title style={{ color: "#54B4D3" }}>
                Change your info
              </Card.Title>
              <Form 
              onSubmit={handleSubmit} 
              className="mb-4">
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label
                    className="display-8"
                    style={{ color: "#ffffff" }}
                  >
                    Change Username
                  </Form.Label>
                  <Form.Control 
                    style={{ color: "white" }}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new username (min. 5 characters)"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label
                    className="display-8"
                    style={{ color: "#ffffff" }}
                  >
                    Change Password
                  </Form.Label>
                  <Form.Control 
                    style={{ color: "white" }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password (min. 8 characters)"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label
                    className="display-8"
                    style={{ color: "#ffffff" }}
                  >
                    Change Email
                  </Form.Label>
                  <Form.Control placeholder="Enter email"
                    style={{ color: "white" }}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="info"
                  type="submit"
                  className="me-2 btn-sm margin-top"
                >
                  Update Profile
                </Button>
                <Button
                  variant="light"
                  type="submit"
                  className="me-2 btn-sm margin-top"
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
                <Card.Body className="d-flex">
                  <Row className="w-100">
                    <Col
                      md="auto"
                      className="col-2 d-flex justify-content-left align-items-center"
                    >
                      <img
                        src={movie.ImageURL}
                        style={{ width: "45px", height: "65px" }}
                        className="main-view-img"
                      />
                    </Col>
                    <Col
                      md="auto"
                      className="col-4 d-flex justify-content-left align-items-center"
                    >
                      <Card.Title style={{ color: "#54B4D3" }} className="fs-6">
                        {movie.Title}
                      </Card.Title>
                    </Col>
                    <Col
                      md="auto"
                      className="col-3 d-flex justify-content-center align-items-center"
                    >
                      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button className="btn-sm" variant="warning">
                          More info
                        </Button>
                      </Link>
                    </Col>
                    <Col
                      md="auto"
                      className="col-3 d-flex justify-content-right align-items-center"
                    >
                      <Button
                        variant="outline-light"
                        className="ms-auto btn-sm"
                        onClick={() => handleRemoveFavorite(movie._id)}
                        alt="Remove from favourites."
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: "red" }}
                        />
                        &nbsp;Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card.Text>No favorite movies found.</Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};