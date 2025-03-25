interface IUIButtonGeneric
{
    onClickEvent: () => void;
    label: string;
    className?: string;
    overrideClassName?: boolean;
    variant?: 'lg' | 'sm' | 'md' | 'full';
    padVariant?: 'lg' | 'sm';
}
const UIButtonGeneric = ({onClickEvent, label, className, overrideClassName, variant, padVariant }: IUIButtonGeneric) => {
    return (
        <button className={ `${overrideClassName? '' : `transition duration-500 ease-in-out border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold py-${padVariant === 'lg'? '3' : '2'} px-4 rounded-${variant || 'lg'} w-auto uppercase`} ${className || ''}` } onClick={ onClickEvent }>{ label }</button>
    );
}

export default UIButtonGeneric;