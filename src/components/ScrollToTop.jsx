import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const SearchBar = () => {
  const { store } = useGlobalReducer();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filteredPeople = store.people
      .filter((person) => person.name.toLowerCase().includes(searchLower))
      .map((person) => ({ ...person, type: "people" }));

    const filteredVehicles = store.vehicles
      .filter((vehicle) => vehicle.name.toLowerCase().includes(searchLower))
      .map((vehicle) => ({ ...vehicle, type: "vehicles" }));

    const filteredPlanets = store.planets
      .filter((planet) => planet.name.toLowerCase().includes(searchLower))
      .map((planet) => ({ ...planet, type: "planets" }));

    const allResults = [...filteredPeople, ...filteredVehicles, ...filteredPlanets].slice(0, 10);

    setResults(allResults);
    setShowDropdown(allResults.length > 0);
  }, [searchTerm, store.people, store.vehicles, store.planets]);

  const handleResultClick = (item) => {
    navigate(`/${item.type}/${item.uid}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getTypeBadge = (type) => {
    if (type === "people") return <span className="badge bg-success">Character</span>;
    if (type === "vehicles") return <span className="badge bg-info">Vehicle</span>;
    if (type === "planets") return <span className="badge bg-warning">Planet</span>;
  };

  return (
    <div className="position-relative" ref={searchRef} style={{ minWidth: "300px" }}>
      <div className="input-group">
        <span className="input-group-text bg-white">
          <i className="fa fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search characters, vehicles, planets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
        />
      </div>

      {showDropdown && results.length > 0 && (
        <div
          className="position-absolute w-100 bg-white border rounded shadow-lg mt-1"
          style={{ maxHeight: "400px", overflowY: "auto", zIndex: 1000 }}
        >
          <ul className="list-group list-group-flush">
            {results.map((item, index) => (
              <li
                key={`${item.type}-${item.uid}-${index}`}
                className="list-group-item list-group-item-action cursor-pointer"
                onClick={() => handleResultClick(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{item.name}</span>
                  {getTypeBadge(item.type)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
