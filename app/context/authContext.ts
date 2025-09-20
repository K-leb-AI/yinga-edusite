"use client";
import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";

export const authContext = createContext<User | null>(null);

export const useAuthContext = (): User | null => {
  const context = useContext(authContext);
  return context;
};
