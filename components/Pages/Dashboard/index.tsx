import Cards from "./Cards";
import Graphs from "./Graphs";
import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="m-8 h-screen">
      <Header />
      <Cards />
      <Graphs />
    </div>
  );
}
