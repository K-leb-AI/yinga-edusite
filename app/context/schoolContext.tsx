"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type SchoolType = {
  schoolName: string;
  contact: string;
  website: string;
  country: string;
  logoUrl: string;
};

type SchoolContextType = {
  schoolData: SchoolType | null;
  setSchoolData: Dispatch<SetStateAction<SchoolType | null>>;
};

export const SchoolContext = createContext<SchoolContextType | null>(null);

export const useSchoolContext = (): SchoolContextType => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error(
      "useSchoolContext must be used within a SchoolContext provider"
    );
  }
  return context;
};

export function SchoolProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [schoolData, setSchoolData] = useState<SchoolType | null>(null);

  return (
    <SchoolContext.Provider value={{ schoolData, setSchoolData }}>
      {children}
    </SchoolContext.Provider>
  );
}
