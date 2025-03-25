import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { IComponentChildren } from '../../interfaces/children.interface';
import ModalComponentContext from './context';
import './styles.scss';

export const useModal = () => {
    const context = useContext(ModalComponentContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalProviderProps {
    children: ReactNode;
}

export interface IModalSettings
{
    title: string;
    content: ReactNode | ReactNode[] | JSX.Element | string | undefined;
    onCloseEvent?: () => void;
    autoWidth?: boolean;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }: IComponentChildren) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isMaximized, setMaximized ] = useState<boolean>(false);
    const [ modalContent, setModalContent ] = useState<ReactNode | ReactNode[] | JSX.Element | string | undefined>( undefined );
    const [ modalTitle, setModalTitle ] = useState<string>('');
    const [ onCloseEvent, setOnCloseEvent ] = useState<undefined | (() => void)>( undefined );
    const [ autoWidth, setAutoWidth ] = useState<boolean>(false);
    const [ modalSettings, setModalSettings ] = useState<IModalSettings | undefined>(undefined);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        if(typeof onCloseEvent === 'function')
            onCloseEvent();
        setAutoWidth(false);
        setIsOpen(false);
    };

    useEffect(() => {
        if(isOpen) {
            return () => {
                if(modalContent !== undefined)
                    setModalContent(undefined);
                if(modalTitle !== '')
                    setModalTitle('');
                if(autoWidth)
                    setAutoWidth(false);
                setModalSettings(undefined);
            }
        }
    }, [ isOpen ]);
    
    useEffect(() => {
      if(modalSettings !== undefined && !isOpen) {
          setModalContent(modalSettings.content);
          if(modalSettings.title)
            setModalTitle(modalSettings.title);
          if(modalSettings.onCloseEvent)
              setOnCloseEvent(modalSettings.onCloseEvent);
          if(modalSettings.autoWidth)
              setAutoWidth(modalSettings.autoWidth);
          openModal();
      }
    }, [ modalSettings])
    

    return (
        <ModalComponentContext.Provider
            value={{
                isOpen,
                openModal,
                closeModal,
                setModalContent,
                modalContent,
                isMaximized,
                setMaximized,
                modalTitle,
                setModalTitle,
                setOnCloseEvent,
                setAutoWidth,
                setModalSettings,
            }}
        >
            { children }
            { isOpen && (
            <div className="modal-wrapper" onClick={ closeModal }>
                <div className={ `modal-container ${autoWidth? 'reduced' : ''}` } onClick={ (e) => e.stopPropagation() }>
                    <div className="modal-header gap-4">
                        <div className="modal-title">{ modalTitle || '' }</div>
                        <div className="modal-close">
                            <button onClick={ closeModal }>&times;</button>
                        </div>
                    </div>
                    <div className="modal-content">
                        { modalContent || '' }
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>) }
        </ModalComponentContext.Provider>
    );
};

export default ModalProvider;