import React from "react";
import { Data } from "../types/types"

export const DBContext = React.createContext<Data | undefined >(undefined);