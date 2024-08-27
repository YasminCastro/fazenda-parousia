"use client";

import SearchBar from "@/components/Global/TopBar";
import SideBar from "@/components/Global/SideBar";
import Dashboard from "@/components/Pages/Dashboard";

export default function Home() {
  return (
    <main className="flex bg-accent">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <SearchBar />
        <Dashboard />
      </div>
    </main>
  );
}
