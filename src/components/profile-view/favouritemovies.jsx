import React from "react";
import Link from "react-router-dom";
import Button from "react-bootstrap";

function FavouriteMovies({ favouriteMovieList }) {
    return (
        <div>
        <h2>Favourite Movies</h2>
        {FavouriteMovies.length > 0 ? (
          FavouriteMovies.map((movie) => {

            return (
            <div key={movie._id}>
                <img src={movies.ImageURL} />
                <Link to={`/movies/${movie._id}`}>
                <h4>{movies.Title}</h4>
                </Link>
                <Button
                  variant="danger"
                  className="ms-auto"
                  onClick={() => handleRemoveFavourite(movie._id)}
                >
                  Remove from list
                </Button>
                
                </div>
          )
        }))
    }
    </div>
)
}

export default FavouriteMovies




