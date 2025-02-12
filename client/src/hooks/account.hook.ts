import { useContext } from "react";
import { IAccountContext } from "../providers/account.provider";
import { AccountContext } from "../providers/account.context";

export const useAccount = (): IAccountContext => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};