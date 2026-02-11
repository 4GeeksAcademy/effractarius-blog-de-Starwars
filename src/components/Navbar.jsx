import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { SearchBar } from "./SearchBar.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (uid, type) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: { uid, type },
    });
  };

  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container d-flex align-items-center">
        <Link to="/" className="navbar-brand mb-0 h1">
          Star Wars
        </Link>
        <div className="mx-3 flex-grow-1">
          <SearchBar />
        </div>
        <div className="d-flex gap-2">
          <Link to="/read-later" className="btn btn-info">
            <i className="fa fa-bookmark me-1"></i>
            Read Later <span className="badge bg-secondary">{store.readLater.length}</span>
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
              {store.favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item">No favorites yet</span>
                </li>
              ) : (
                store.favorites.map((fav, index) => (
                  <li key={`${fav.type}-${fav.uid}-${index}`}>
                    <div className="dropdown-item d-flex justify-content-between align-items-center">
                      <Link
                        to={`/${fav.type}/${fav.uid}`}
                        className="text-decoration-none text-dark"
                      >
                        {fav.name}
                      </Link>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleRemoveFavorite(fav.uid, fav.type)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};