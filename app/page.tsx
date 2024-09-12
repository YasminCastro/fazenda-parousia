"use client";

import Cards from "@/components/Pages/Dashboard/Cards";
import Charts from "@/components/Pages/Dashboard/Charts";
import Header from "@/components/Pages/Dashboard/Header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="m-8 space-y-5">
        <Header />
        <Cards />
        <div className="h-96">
          <Charts />
        </div>
      </div>
    </div>
  );
}
