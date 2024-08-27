"use client";

import styles from "./styles.module.css";
import { Search } from "@/components/ui/search";
export default function TopBar() {
  return (
    <div className={`bg-card ${styles.noLeftShadow} h-14`}>
      <div className="ml-8 flex h-full items-center">
        <Search type="text" placeholder="Dairy GPT" readOnly />
      </div>
    </div>
  );
}
