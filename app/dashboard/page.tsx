"use client";

import SearchBar from "@/components/Global/TopBar";
import SideBar from "@/components/Global/SideBar";
import Dashboard from "@/components/Pages/Dashboard";
import { BatchProvider } from "@/providers/BatchContext";

export default function PageDashboard() {
  return (
    <BatchProvider>
      <main className="flex h-screen bg-accent">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <SearchBar />
          <Dashboard />
        </div>
      </main>
    </BatchProvider>
  );
}
