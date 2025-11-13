import React, { createContext, useContext, useState } from "react";

interface SectionContextValue {
  section: string;
  setSection: (value: string) => void;
}

const SectionContext = createContext<SectionContextValue>({
  section: "top",
  setSection: () => {},
});

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSection] = useState("top");
  return (
    <SectionContext.Provider value={{ section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
