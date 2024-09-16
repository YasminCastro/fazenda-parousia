"use client";

import AnimalChart from "@/components/Pages/AnimalPerformance/AnimalChart";
import AnimalInfo from "@/components/Pages/AnimalPerformance/AnimalInfo";
import AnimalTimeline from "@/components/Pages/AnimalPerformance/AnimalTimeline";
import Header from "@/components/Pages/AnimalPerformance/Header";

export default function Page() {
  return (
    <div className="m-8">
      <Header />
      <div className="flex flex-col gap-10">
        <AnimalInfo />
        <AnimalTimeline />
        {/* <AnimalChart /> */}
      </div>
    </div>
  );
}
