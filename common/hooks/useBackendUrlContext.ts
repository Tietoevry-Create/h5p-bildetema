import { useContext } from "react";
import { BackendUrlContext } from "../context/BackendUrlContext";

export const useBackendUrlContext = (): string => {
  return useContext(BackendUrlContext);
};
