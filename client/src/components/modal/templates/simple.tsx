import { IComponentChildren } from "../../../interfaces/children.interface";
import { useModalHook } from "../hook";

interface IModalTemplateSimple extends IComponentChildren
{
    cancelText?: string;
    onCancelEvent?: ( closeModal: () => void ) => void;
    buttons?: { label: string, clickEvent: any, className?: string }[]
}

const ModalTemplateSimple = ({ onCancelEvent, buttons, cancelText }: IModalTemplateSimple) => {
    const { closeModal } = useModalHook();
    const baseClassName = "transition duration-500 ease-in-out border border-red-500 hover:text-white font-bold py-2 px-4 rounded-lg w-auto uppercase"
    return (
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
                {
                    buttons && buttons.map((b, i) => (
                        <button key={i} className={b.className || `${baseClassName} bg-red-500 text-white hover:bg-red-800`} onClick={b.clickEvent}>{b.label}</button>
                    ))
                }
                <button className={`${baseClassName} bg-transparent text-red-500 hover:bg-red-500`} onClick={ () => {
                    if(typeof onCancelEvent === 'function') {
                        onCancelEvent( closeModal );
                    } else {
                        closeModal();
                    }
                } }>{ cancelText || 'Cancel' }</button>
            </div>
        </div>
    )
}

export default ModalTemplateSimple;