import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddRemoveBtn = ({ movieId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movieId)
  );

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movieId));
  }, [movieId]);

  const token = localStorage.getItem("token");
  const handleAddToFav = async (MovieID) => {
    try {
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://cmdb-b8f3cd58963f.herokuapp.com/users/${user.username}/movies/${MovieID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to add movie to favorites");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite((PrevState) => !PrevState);
    } catch (error) {
      console.log(
        `An error occurred while adding the movie to favorites: ${error.message}`
      );
    }
  };
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
          return response.json();
        } else {
          alert("Failed to remove the movie from favorites.");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite((PrevState) => !PrevState);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };
  return (
    <>
      {isFavorite ? (
        <Button
          className="btn-sm margin-top"
          variant="outline-light"
          onClick={() => handleRemoveFavorite(movieId)}
          alt="Remove from favourites."
        >
          <FontAwesomeIcon icon={solidHeart} style={{ color: "red" }} />
          &nbsp;Remove
        </Button>
      ) : (
        <Button
          className="btn-sm margin-top"
          variant="outline-info"
          onClick={() => handleAddToFav(movieId)}
          alt="Add to favourties."
        >
          <FontAwesomeIcon icon={regularHeart} />
          &nbsp;Add to list
        </Button>
      )}
    </>
  );
};

export default AddRemoveBtn;
