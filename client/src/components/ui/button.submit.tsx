import IUiButtonSubmit from "./button.submit.interface";

const UiButtonSubmit = ({ label, disabled, loader, minWidth, className, buttonClassName, loading }: IUiButtonSubmit ) => {
    const width: number = minWidth || 120;
    return (
        <button
            style={{ minWidth: `${width}px` }}
            disabled={ disabled || loading }
            type="submit"
            className={ `${ className || 'transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full w-auto uppercase ui-button-submit'} ${ disabled? `opacity-50 cursor-not-allowed` : '' }` }
        >{ loader? loader && loading? <div className={ buttonClassName || 'btn-spinner' }></div> : label : label }
        </button>
    )
}

export default UiButtonSubmit;