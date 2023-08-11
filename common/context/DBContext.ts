import { createContext } from "react";
import { Data } from "../types/types";

export const DBContext = createContext<Data | undefined>(undefined);
