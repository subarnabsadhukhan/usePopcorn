import { useState } from "react";
import NavBar, { NumResults } from "./components/NavBar";
import Main from "./components/Main";
import { tempMovieData, tempWatchedData } from "./demo-data";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Box, { MovieList } from "./components/Box";
import { WatchedMoviesList, WatchedSummary } from "./components/WatchedBox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
