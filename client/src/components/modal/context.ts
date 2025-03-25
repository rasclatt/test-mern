import { createContext, ReactNode } from 'react';
import { IModalSettings } from './provider';

interface IModalComponentContext {
    isOpen: boolean;
    openModal: () => void;
    isMaximized: boolean;
    setMaximized: (maximized: boolean) => void;
    closeModal: () => void;
    setModalContent: (content: ReactNode | ReactNode[] | JSX.Element | string | undefined) => void;
    modalContent: ReactNode | ReactNode[] | JSX.Element | undefined | string;
    modalTitle: string;
    setModalTitle: (title: string) => void;

    setOnCloseEvent?: (event: () => void) => void;
    setAutoWidth: (autoWidth: boolean) => void;
    setModalSettings: (settings: IModalSettings | undefined) => void;
}

const ModalComponentContext = createContext<IModalComponentContext>({} as IModalComponentContext);

export default ModalComponentContext;