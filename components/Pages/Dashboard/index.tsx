import Cards from "./Cards";
import Graphs from "./Graphs";
import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="m-8 h-screen">
      <Header />
      <Cards />
      <div className="h-1/2">
        <Graphs />
      </div>
    </div>
  );
}
