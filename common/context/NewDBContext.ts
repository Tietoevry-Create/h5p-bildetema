import { createContext } from "react";
import { NewData } from "../types/types";

export const NewDBContext = createContext<NewData | undefined>(undefined);
