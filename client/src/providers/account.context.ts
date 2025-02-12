import { createContext } from "react";
import { IAccountContext } from "./account.provider";

export const AccountContext = createContext<IAccountContext | undefined>(undefined);