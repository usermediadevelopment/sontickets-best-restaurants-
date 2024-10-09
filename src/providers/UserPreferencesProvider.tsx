"use client";
import React, { createContext, useReducer, ReactNode } from "react";

type UserPreferences = {
  city: string;
  category: string;
  area: string;
};

type UserPreferencesContextType = {
  preferences: UserPreferences;
  setCity: (city: string) => void;
  setCategory: (category: string) => void;
  setArea: (area: string) => void;
};

export const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_AREA"; payload: string };

const preferencesReducer = (
  state: UserPreferences,
  action: Action
): UserPreferences => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_AREA":
      return { ...state, area: action.payload };
    default:
      return state;
  }
};

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [preferences, dispatch] = useReducer(preferencesReducer, {
    city: "",
    category: "",
    area: "",
  });

  const setCity = (city: string) =>
    dispatch({ type: "SET_CITY", payload: city });
  const setCategory = (category: string) =>
    dispatch({ type: "SET_CATEGORY", payload: category });
  const setArea = (area: string) =>
    dispatch({ type: "SET_AREA", payload: area });

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, setCity, setCategory, setArea }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
