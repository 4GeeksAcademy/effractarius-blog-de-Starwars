import { useEffect } from "react";
import useGlobalReducer from "./useGlobalReducer.jsx";

export const useSwapiData = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const hasData =
      store.people.length > 0 ||
      store.vehicles.length > 0 ||
      store.planets.length > 0;

    if (hasData) return;

    const fetchData = async () => {
      try {
        const [peopleRes, vehiclesRes, planetsRes] = await Promise.all([
          fetch("https://www.swapi.tech/api/people?page=1&limit=10"),
          fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10"),
          fetch("https://www.swapi.tech/api/planets?page=1&limit=10"),
        ]);

        const [peopleData, vehiclesData, planetsData] = await Promise.all([
          peopleRes.json(),
          vehiclesRes.json(),
          planetsRes.json(),
        ]);

        dispatch({ type: "SET_PEOPLE", payload: peopleData.results });
        dispatch({ type: "SET_VEHICLES", payload: vehiclesData.results });
        dispatch({ type: "SET_PLANETS", payload: planetsData.results });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [store, dispatch]);

  return store;
};