import SearchBar from "@/components/Global/TopBar";
import SideBar from "@/components/Global/SideBar";
import Dashboard from "@/components/Pages/Dashboard";

export default function PageDashboard() {
  return (
    <main className="flex h-screen bg-accent">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <SearchBar />
        <Dashboard />
      </div>
    </main>
  );
}
