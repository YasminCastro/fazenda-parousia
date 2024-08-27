"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { Gauge, ChevronRight, ChevronLeft } from "lucide-react";
import { useSidebarContext } from "@/providers/SidebarContext";

const sidebarItems = [
  {
    name: "Desempenho Parousia",
    href: "/",
    icon: Gauge,
  },
];

export default function SideBar() {
  const { isCollapsed, toggleSidebarcollapse } = useSidebarContext();
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-20 flex h-6 w-6 translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-lg"
        onClick={toggleSidebarcollapse}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <aside
        className={`duration-400 h-full overflow-hidden bg-white p-4 transition-all ease-in-out ${
          isCollapsed ? "w-20" : "w-68"
        }`}
        data-collapse={isCollapsed}
      >
        <div className="mb-4 flex items-center gap-4 border-b border-gray-200 pb-4">
          <Image
            width={80}
            height={80}
            className="h-14 w-14 rounded-lg object-contain"
            src="/favicon.svg"
            alt="logo"
          />
          {/* <p
            className={`text-xl font-semibold ${isCollapsed ? "hidden" : "block"}`}
          >
            Fazenda
          </p> */}
        </div>
        <ul className="list-none">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li key={name} className="mb-4">
              <Link
                className={`flex items-center rounded-lg bg-gray-100 p-3 text-base text-black transition hover:bg-sky-500 hover:text-white ${
                  pathname === href ? "bg-sky-500 text-white" : ""
                }`}
                href={href}
              >
                <span className="text-xl">
                  <Icon />
                </span>
                <span className={`ml-2 ${isCollapsed ? "hidden" : "block"}`}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
