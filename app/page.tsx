"use client";

import SearchBar from "@/components/Global/TopBar";
import SideBar from "@/components/Global/SideBar";
import Dashboard from "@/components/Pages/Dashboard";
import { FilterProvider } from "@/providers/FilterContext";

export default function Home() {
  return (
    <FilterProvider>
      <main className="flex bg-accent">
        <SideBar />
        <div className="ml-60 flex flex-1 flex-col">
          <SearchBar />
          <Dashboard />
        </div>
      </main>
    </FilterProvider>
  );
}
