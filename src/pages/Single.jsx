import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const Single = () => {
  const { type, id } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const data = await response.json();
        setEntity(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entity:", error);
        setLoading(false);
      }
    };

    fetchEntity();
  }, [type, id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="container text-center mt-5">
        <h1>Entity not found</h1>
        <Link to="/" className="btn btn-primary mt-3">
          Back home
        </Link>
      </div>
    );
  }

  const getImageUrl = () => {
    const baseUrl = "https://starwars-visualguide.com/assets/img";
    if (type === "people") return `${baseUrl}/characters/${id}.jpg`;
    if (type === "vehicles") return `${baseUrl}/vehicles/${id}.jpg`;
    if (type === "planets") return `${baseUrl}/planets/${id}.jpg`;
  };

  const renderProperties = () => {
    const props = entity.properties;
    if (type === "people") {
      return (
        <>
          <p><strong>Height:</strong> {props.height}</p>
          <p><strong>Mass:</strong> {props.mass}</p>
          <p><strong>Hair Color:</strong> {props.hair_color}</p>
          <p><strong>Skin Color:</strong> {props.skin_color}</p>
          <p><strong>Eye Color:</strong> {props.eye_color}</p>
          <p><strong>Birth Year:</strong> {props.birth_year}</p>
          <p><strong>Gender:</strong> {props.gender}</p>
        </>
      );
    }
    if (type === "vehicles") {
      return (
        <>
          <p><strong>Model:</strong> {props.model}</p>
          <p><strong>Manufacturer:</strong> {props.manufacturer}</p>
          <p><strong>Cost:</strong> {props.cost_in_credits} credits</p>
          <p><strong>Length:</strong> {props.length}</p>
          <p><strong>Max Speed:</strong> {props.max_atmosphering_speed}</p>
          <p><strong>Crew:</strong> {props.crew}</p>
          <p><strong>Passengers:</strong> {props.passengers}</p>
          <p><strong>Vehicle Class:</strong> {props.vehicle_class}</p>
        </>
      );
    }
    if (type === "planets") {
      return (
        <>
          <p><strong>Diameter:</strong> {props.diameter}</p>
          <p><strong>Rotation Period:</strong> {props.rotation_period}</p>
          <p><strong>Orbital Period:</strong> {props.orbital_period}</p>
          <p><strong>Gravity:</strong> {props.gravity}</p>
          <p><strong>Population:</strong> {props.population}</p>
          <p><strong>Climate:</strong> {props.climate}</p>
          <p><strong>Terrain:</strong> {props.terrain}</p>
          <p><strong>Surface Water:</strong> {props.surface_water}</p>
        </>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={getImageUrl()}
            className="img-fluid rounded"
            alt={entity.properties.name}
            onError={(e) => {
              e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{entity.properties.name}</h1>
          <hr className="my-4" />
          <div className="mt-4">{renderProperties()}</div>
          <Link to="/" className="btn btn-primary mt-4">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};
