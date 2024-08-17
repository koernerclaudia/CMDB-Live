export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImageURL}/>
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Main Actors: </span>
          <span>{movie.Actors.join(', ')}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Type}</span>
        </div>
        <div>
          <span>ID: </span>
          <span>{movie._id}</span>
        </div>
        <button onClick={onBackClick}>Back to Movie List</button>
      </div>
    );
  };
  