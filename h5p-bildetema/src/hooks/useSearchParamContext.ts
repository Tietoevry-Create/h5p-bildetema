import { useContext } from "react";
import {
  SearchParamContext,
  SearchParamContextType,
} from "../context/SearchParamContext";

export const useSearchParamContext = (): SearchParamContextType => {
  const context = useContext(SearchParamContext);
  if (context === undefined) {
    throw new Error("useSearchParamContext must be used within a page.");
  }
  return context;
};
