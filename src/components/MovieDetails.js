import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../custom-hooks/useKey";

function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);

  const {
    Title,
    Genre,
    Plot,
    Poster,
    imdbRating,
    Released,
    Actors,
    Director,
    Runtime,
  } = movie;

  const handleAdd = () => {
    onAddWatched({
      imdbID: selectedId,
      Title,
      Poster,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(" ").at(0)),
      userRating: Number(userRating),
    });
    onCloseMovieDetails();
  };

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [selectedId]);

  useEffect(() => {
    if (Title) document.title = `${Title} | Movie Details`;
    return () => (document.title = "usePopcorn");
  }, [Title]);

  useKey("Escape", onCloseMovieDetails);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
            <img src={Poster} alt={`${Title} poster`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {" "}
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={watchedMovie ? watchedMovie.userRating : 0}
                className={watchedMovie ? "disabled" : ""}
              />
              {userRating && !watchedMovie && (
                <button className="btn-add" onClick={handleAdd}>
                  Add to Watched
                </button>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
