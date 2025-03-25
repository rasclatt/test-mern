import { useContext } from "react";
import ModalComponentContext from "./context";

export const useModalHook = () => {
    const context = useContext(ModalComponentContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};