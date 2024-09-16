"use client";

import AnimalChart from "@/components/Pages/AnimalPerformance/AnimalChart";
import AnimalChartInfo from "@/components/Pages/AnimalPerformance/AnimalChartInfo";
import AnimalInfo from "@/components/Pages/AnimalPerformance/AnimalInfo";
import AnimalTimeline from "@/components/Pages/AnimalPerformance/AnimalTimeline";
import Header from "@/components/Pages/AnimalPerformance/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [] = useState();
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axios.get(`/api/animal-performance`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAnimalData();
  }, []);
  return (
    <div className="m-8 min-h-[70vh]">
      <Header />
      <div className="flex h-[70vh] flex-col gap-6">
        <AnimalInfo />
        <div className="mx-20 grid flex-grow grid-cols-[1fr_3fr]">
          <AnimalTimeline />
          <div className="flex flex-col items-center gap-2">
            <AnimalChart />
            <AnimalChartInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
