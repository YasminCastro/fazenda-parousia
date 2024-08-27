"use client";

import SearchBar from "@/components/Global/TopBar";
import Dashboard from "@/components/Pages/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SearchBar />
      <Dashboard />
    </div>
  );
}
