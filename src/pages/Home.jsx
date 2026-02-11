import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const hasData = store.people.length > 0 || store.vehicles.length > 0 || store.planets.length > 0;

    if (hasData) {
      return;
    }

    const fetchData = async () => {
      try {
        const peopleRes = await fetch("https://www.swapi.tech/api/people?page=1&limit=10");
        const peopleData = await peopleRes.json();
        dispatch({ type: "SET_PEOPLE", payload: peopleData.results });

        const vehiclesRes = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10");
        const vehiclesData = await vehiclesRes.json();
        dispatch({ type: "SET_VEHICLES", payload: vehiclesData.results });

        const planetsRes = await fetch("https://www.swapi.tech/api/planets?page=1&limit=10");
        const planetsData = await planetsRes.json();
        dispatch({ type: "SET_PLANETS", payload: planetsData.results });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="mb-5">
        <h2 className="text-danger mb-3">Characters</h2>
        <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
          {store.people.map((person) => (
            <div key={person.uid} style={{ minWidth: "18rem" }}>
              <Card item={person} type="people" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-danger mb-3">Vehicles</h2>
        <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
          {store.vehicles.map((vehicle) => (
            <div key={vehicle.uid} style={{ minWidth: "18rem" }}>
              <Card item={vehicle} type="vehicles" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-danger mb-3">Planets</h2>
        <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
          {store.planets.map((planet) => (
            <div key={planet.uid} style={{ minWidth: "18rem" }}>
              <Card item={planet} type="planets" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 