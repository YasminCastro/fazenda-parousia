"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

import { Gauge, LineChart, CircleDollarSign } from "lucide-react";
import { DatePicker } from "../DatePicker";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="fixed flex h-screen w-full max-w-60 flex-col items-center bg-card shadow-lg">
      {/* TITLE */}
      <h2 className="pt-7 text-xl font-bold text-blue-600">
        Pecuária Leiteira
      </h2>
      {/* NAV */}
      <nav className="flex w-full flex-col px-3 py-6">
        <Link
          href=""
          // className={`${styles.navLink} ${pathname === "/dashboard" ? styles.navLinkActive : styles.navLinkDefault}`}
          className={`${styles.navLink} ${styles.navLinkActive} text-center text-sm`}
        >
          <Gauge />
          Desempenho Parousia
        </Link>
        {/* <Link
          href="/performance"
          className={`${styles.navLink} ${pathname === "/performance" ? styles.navLinkActive : styles.navLinkDefault}`}
        >
          <LineChart />
          Desempenho
        </Link>
        <Link
          href="/economic"
          className={`${styles.navLink} ${pathname === "/economic" ? styles.navLinkActive : styles.navLinkDefault}`}
        >
          <CircleDollarSign />
          Econômico
        </Link> */}
      </nav>
      {/* DATE FILTER */}

      {/* SETTINGS */}
      {/* <div className="mt-auto flex w-full flex-col items-start gap-4 border-t px-10 py-4">
        <Link href="/setting" className={styles.bottomButtons}>
          <Settings />
          Configurações
        </Link>
        <Link href="/" className={styles.bottomButtons}>
          <Power /> Sair
        </Link>
      </div> */}
    </div>
  );
}
