import { Card } from "../components/Card.jsx";
import { useSwapiData } from "../hooks/useSwapiData.jsx";

export const Home = () => {
  const store = useSwapiData();

  return (
    <div className="container">
      <Section title="Characters" items={store.people} type="people" />
      <Section title="Vehicles" items={store.vehicles} type="vehicles" />
      <Section title="Planets" items={store.planets} type="planets" />
    </div>
  );
};

const Section = ({ title, items, type }) => (
  <div className="mb-5">
    <h2 className="text-danger mb-3">{title}</h2>
    <div className="d-flex overflow-auto pb-3" style={{ gap: "1rem" }}>
      {items.map((item) => (
        <div key={item.uid} style={{ minWidth: "18rem" }}>
          <Card item={item} type={type} />
        </div>
      ))}
    </div>
  </div>
);