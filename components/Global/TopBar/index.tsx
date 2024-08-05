"use client";

import { Input } from "@/components/ui/input";
import styles from "./styles.module.css";
import { Search } from "lucide-react";

export default function TopBar() {
  return (
    <div className={`bg-card ${styles.noLeftShadow}`}>
      <div className="flex h-14 items-center">
        {/* SEARCH BAR */}
        <div className="relative mx-20 h-10 w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-500"
          />
          <Input
            type="text"
            placeholder="Dairy GPT"
            className="text-md rounded-full border border-gray-300 py-2 pl-10 pr-3 shadow-sm"
            value=""
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
