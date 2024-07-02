"use client";

import SearchBar from "@/components/Global/TopBar";
import SideBar from "@/components/Global/SideBar";
import Dashboard from "@/components/Pages/Dashboard";
import { FilterProvider } from "@/providers/FilterContext";

export default function PageDashboard() {
  return (
    <FilterProvider>
      <main className="flex h-screen bg-accent">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <SearchBar />
          <Dashboard />
        </div>
      </main>
    </FilterProvider>
  );
}
