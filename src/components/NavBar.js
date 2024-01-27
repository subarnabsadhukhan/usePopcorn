function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export default NavBar;

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
