"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface IValue {
  isCollapsed: boolean;
  toggleSidebarcollapse: () => void;
}

const SidebarContext = createContext({} as IValue);

export const SidebarProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setCollapse] = useState(false);
  const toggleSidebarCollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  const value = useMemo(
    () => ({
      isCollapsed,
      toggleSidebarcollapse: toggleSidebarCollapse,
    }),
    [isCollapsed, toggleSidebarCollapse],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = (): IValue => useContext(SidebarContext);
