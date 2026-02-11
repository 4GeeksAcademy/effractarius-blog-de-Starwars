import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const ReadLater = () => {
  const { store } = useGlobalReducer();

  const peopleReadLater = store.readLater.filter(item => item.type === "people");
  const vehiclesReadLater = store.readLater.filter(item => item.type === "vehicles");
  const planetsReadLater = store.readLater.filter(item => item.type === "planets");

  const hasReadLaterItems = store.readLater.length > 0;

  return (
    <div className="container">
      <h1 className="text-center my-4">Read Later</h1>

      {!hasReadLaterItems && (
        <div className="text-center my-5">
          <h3 className="text-muted">No items saved yet</h3>
          <p className="text-muted">Click the bookmark icon on any card to save it here</p>
        </div>
      )}

      {peopleReadLater.length > 0 && (
        <div className="mb-5">
          <h2 className="text-danger mb-3">Characters</h2>
          <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
            {peopleReadLater.map((person) => (
              <div key={person.uid} style={{ minWidth: "18rem" }}>
                <Card item={person} type="people" />
              </div>
            ))}
          </div>
        </div>
      )}

      {vehiclesReadLater.length > 0 && (
        <div className="mb-5">
          <h2 className="text-danger mb-3">Vehicles</h2>
          <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
            {vehiclesReadLater.map((vehicle) => (
              <div key={vehicle.uid} style={{ minWidth: "18rem" }}>
                <Card item={vehicle} type="vehicles" />
              </div>
            ))}
          </div>
        </div>
      )}

      {planetsReadLater.length > 0 && (
        <div className="mb-5">
          <h2 className="text-danger mb-3">Planets</h2>
          <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
            {planetsReadLater.map((planet) => (
              <div key={planet.uid} style={{ minWidth: "18rem" }}>
                <Card item={planet} type="planets" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
