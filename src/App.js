import { useCallback, useState } from "react";
import NavBar, { NumResults } from "./components/NavBar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Box, { MovieList } from "./components/Box";
import { WatchedMoviesList, WatchedSummary } from "./components/WatchedBox";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const handleCloseMovieDetails = useCallback(() => setSelectedId(null), []);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleRemoveWatched(imdbID) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== imdbID));
  }

  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseMovieDetails
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} setSelectedId={setSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              onCloseMovieDetails={handleCloseMovieDetails}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
