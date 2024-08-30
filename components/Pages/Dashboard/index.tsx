import Cards from "./Cards";
import Charts from "./Charts";
import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="m-8 space-y-5">
      <Header />
      <Cards />
      <div className="h-96">
        <Charts />
      </div>
    </div>
  );
}
