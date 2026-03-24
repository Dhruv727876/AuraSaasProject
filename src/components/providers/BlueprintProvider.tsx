"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BlueprintContext = createContext({
  isBlueprint: false,
  toggleBlueprint: () => {},
});

export const useBlueprint = () => useContext(BlueprintContext);

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [isBlueprint, setIsBlueprint] = useState(false);

  useEffect(() => {
    if (isBlueprint) {
      document.documentElement.classList.add("blueprint-mode");
    } else {
      document.documentElement.classList.remove("blueprint-mode");
    }
  }, [isBlueprint]);

  return (
    <BlueprintContext.Provider value={{ isBlueprint, toggleBlueprint: () => setIsBlueprint(!isBlueprint) }}>
      {children}
    </BlueprintContext.Provider>
  );
}
