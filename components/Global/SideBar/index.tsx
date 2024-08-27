"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Menu, X } from "lucide-react";
import { useSidebarContext } from "@/providers/SidebarContext";

const sidebarItems = [
  {
    name: "Desempenho",
    href: "/",
    icon: Gauge,
  },
];

export default function SideBar() {
  const { isCollapsed, toggleSidebarcollapse } = useSidebarContext();
  const pathname = usePathname();

  return (
    <div className="relative">
      <div
        className={`duration-400 h-full overflow-hidden bg-white p-4 transition-all ease-in-out ${
          isCollapsed ? "w-20" : "w-68"
        }`}
        data-collapse={isCollapsed}
      >
        <div className="justify-left mb-4 flex items-center border-b border-gray-200 pb-4 pl-2">
          <button
            className="flex items-center justify-center bg-white"
            onClick={toggleSidebarcollapse}
          >
            {isCollapsed ? <Menu /> : <X />}
          </button>
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
                <span>
                  <Icon />
                </span>
                <span className={`ml-2 ${isCollapsed ? "hidden" : "block"}`}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
