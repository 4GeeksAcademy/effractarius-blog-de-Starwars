import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favorites.some(
    (fav) => fav.uid === item.uid && fav.type === type
  );

  const isReadLater = store.readLater.some(
    (saved) => saved.uid === item.uid && saved.type === type
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: { uid: item.uid, name: item.name, type: type },
      });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: { uid: item.uid, name: item.name, type: type },
      });
    }
  };

  const handleReadLater = () => {
    if (isReadLater) {
      dispatch({
        type: "REMOVE_READ_LATER",
        payload: { uid: item.uid, name: item.name, type: type },
      });
    } else {
      dispatch({
        type: "ADD_READ_LATER",
        payload: { uid: item.uid, name: item.name, type: type },
      });
    }
  };

  const getImageUrl = () => {
    const baseUrl = "https://starwars-visualguide.com/assets/img";
    if (type === "people") return `${baseUrl}/characters/${item.uid}.jpg`;
    if (type === "vehicles") return `${baseUrl}/vehicles/${item.uid}.jpg`;
    if (type === "planets") return `${baseUrl}/planets/${item.uid}.jpg`;
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={getImageUrl()}
        className="card-img-top"
        alt={item.name}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <div className="d-flex gap-2">
            <button
              className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
              onClick={handleFavorite}
              title="Add to favorites"
            >
              <i className="fa fa-heart"></i>
            </button>
            <button
              className={`btn ${isReadLater ? "btn-info" : "btn-outline-info"}`}
              onClick={handleReadLater}
              title="Read later"
            >
              <i className="fa fa-bookmark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
