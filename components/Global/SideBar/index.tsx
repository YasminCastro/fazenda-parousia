"use client";

import Link from "next/link";
import {
  FaPowerOff,
  FaGear,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { IoSpeedometerOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-full min-w-60 max-w-60 flex-col items-center bg-card shadow-lg">
      {/* TITLE */}
      <h2 className="pt-7 text-xl font-bold text-blue-600">
        Pecuária Leiteira
      </h2>
      {/* NAV */}
      <nav className="flex w-full flex-col gap-2 p-6">
        <Link
          href="/dashboard"
          className={`${styles.navLink} ${pathname === "/dashboard" ? styles.navLinkActive : styles.navLinkDefault}`}
        >
          <IoSpeedometerOutline />
          Dashboard
        </Link>
        <Link
          href="/performance"
          className={`${styles.navLink} ${pathname === "/performance" ? styles.navLinkActive : styles.navLinkDefault}`}
        >
          <FaChartLine />
          Desempenho
        </Link>
        <Link
          href="/economic"
          className={`${styles.navLink} ${pathname === "/economic" ? styles.navLinkActive : styles.navLinkDefault}`}
        >
          <FaMoneyBillWave />
          Econômico
        </Link>
      </nav>
      {/* SETTINGS */}
      <div className="mt-auto flex w-full flex-col items-start gap-4 border-t px-10 py-4">
        <Link href="/setting" className={styles.bottomButtons}>
          <FaGear />
          Configurações
        </Link>
        <Link href="/" className={styles.bottomButtons}>
          <FaPowerOff /> Sair
        </Link>
      </div>
    </div>
  );
}
