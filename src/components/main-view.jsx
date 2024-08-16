import { useState } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
     
        {
          "id": "66a374b384a37c5b1b60c5c8",
          "Description": "A ballerina's role in a New York City ballet creates a consuming obsession that leads to her psychological unraveling",
          "DirectorName": "Darren Aronofsky",
          "DirectorBirthyear": "1969",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "Black Swan",
          "Actors": [
            "Natalie Portman",
            "Mila Kunis"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/41EWw6SaPxL._SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c0",
          "Description": "A young boy befriends a stranded extraterrestrial and aids him return home while avoiding government capture",
          "DirectorName": "Steven Spielberg",
          "DirectorBirthyear": "1946",
          "GenreType": "Sci-Fi",
          "GenreDescription": "Science Fiction - stuff that cannot be real.",
          "Title": "E.T.",
          "Actors": [
            "Henry Thomas",
            "Drew Barrymore"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/51nD3pDsEiL._SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5ca",
          "Description": "With the help of a German bounty hunter...",
          "DirectorName": "Quentin Tarantino",
          "DirectorBirthyear": "1963",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "Django Unchained",
          "Actors": [
            "Jamie Foxx",
            "Leonardo DiCaprio",
            "Christoph Waltz"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/51uWBx3U4nL._SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c9",
          "Description": "A protagonist armed with only one word—Tenet—and fighting for the survival of the world",
          "DirectorName": "Christopher Nolan",
          "DirectorBirthyear": "1970",
          "GenreType": "Drama",
          "GenreDescription": "Tough stories.",
          "Title": "Tenet",
          "Actors": [
            "John David Washington",
            "Robert Pattinson",
            "Elisabeth Debicki",
            "Kenneth Branagh"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/51FiVHaGNRL._SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5cc",
          "Description": "Follows intertwined stories of several mobsters and small-time criminals in Los Angeles.",
          "DirectorName": "Quentin Tarantino",
          "DirectorBirthyear": "1963",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "Pulp Fiction",
          "Actors": [
            "John Travolta",
            "Samuel L. Jackson",
            "Uma Thurman"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/71mlgE7nUdL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5cb",
          "Description": "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
          "DirectorName": "Quentin Tarantino",
          "DirectorBirthyear": "1963",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "Once Upon a Time in Hollywood",
          "Actors": [
            "Leonardo DiCaprio",
            "Margo Robbie",
            "Brad Pitt"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/71wv593z05L.__AC_SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c7",
          "Description": "A suburbanite becomes convinced that his new neighbors are a murderous satanic cult",
          "DirectorName": "Joe Dante",
          "DirectorBirthyear": "1946",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "The Burbs",
          "Actors": [
            "Tom Hanks",
            "Bruce Dern",
            "Carrie Fisher",
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/81WbORFlfcL._AC_UY218_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c4",
          "Description": "A rock musician and his fiancée are brutally murdered",
          "DirectorName": "Alex Proyas",
          "DirectorBirthyear": "1963",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "The Crow",
          "Actors": [
            "Brandon Lee",
            "Ernie Hudson"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/51QGQOeUoRL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c2",
          "Description": "Thor must fight to prevent the destruction of his home and the end of Asgard",
          "DirectorName": "Taika Waititi",
          "DirectorBirthyear": "1975",
          "GenreType": "Comic",
          "GenreDescription": "Superheros and stuff...",
          "Title": "Thor: Ragnarok",
          "Actors": [
            "Chris Hemsworth",
            "Tom Hiddleston",
            "Natalie Portman"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/71YxFqhNB8L.__AC_SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c5",
          "Description": "A reformed neo-Nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did",
          "DirectorName": "Tony Kaye",
          "DirectorBirthyear": "1952",
          "GenreType": "Drama",
          "GenreDescription": "Tough stories.",
          "Title": "American History X",
          "Actors": [
            "Edward Norton",
            "Edward Furlong"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/517YcrbTxjL._SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c1",
          "Description": "A former assassin seeks revenge against the team of assassins who betrayed her and left her for dead",
          "DirectorName": "Quentin Tarantino",
          "DirectorBirthyear": "1963",
          "GenreType": "Thriller",
          "GenreDescription": "Gives you the chills.",
          "Title": "Kill Bill",
          "Actors": [
            "Uma Thurman",
            "David Carradine"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/71n3PxDFetL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c6",
          "Description": "A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend",
          "DirectorName": "Robert Zemeckis",
          "DirectorBirthyear": "1952",
          "GenreType": "Sci-Fi",
          "GenreDescription": "Science Fiction - stuff that cannot be real.",
          "Title": "Back to the Future",
          "Actors": [
            "Michael J. Fox",
            "Christopher Lloyd"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/81cO3Mr0X9L._AC_UY436_FMwebp_QL65_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5c3",
          "Description": "A man learns to cope with his recent divorce with the help of a bachelor, but complications arise when he starts to fall for someone else",
          "DirectorName": "Glenn Ficarra",
          "DirectorBirthyear": "1969",
          "GenreType": "RomCom",
          "GenreDescription": "Romantic and Comedic.",
          "Title": "Crazy, Stupid, Love",
          "Actors": [
            "Steve Carell",
            "Ryan Gosling"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/81R+um2hn+L._AC_UY436_FMwebp_QL65_.jpg",
          "Featured": true
        },
        {
          "id": "66a374b384a37c5b1b60c5bf",
          "Description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival",
          "DirectorName": "Christopher Nolan",
          "DirectorBirthyear": "1970",
          "GenreType": "Sci-Fi",
          "GenreDescription": "Science Fiction - stuff that cannot be real.",
          "Title": "Interstellar",
          "Actors": [
            "Matthew McConaughey",
            "Anne Hathaway"
          ],
          "ImageURL": "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_SL1500_.jpg",
          "Featured": true
        }
      ]
      );

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <h1>Welcome to Claudia's Movie Database (cMDB)</h1>
      <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie
          ) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div></div>
  );
};
