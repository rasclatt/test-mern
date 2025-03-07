const UiButtonSubmit = ({ label, disabled }: { label: string, disabled?: boolean }) => {
    return (
        <button
            disabled={ disabled }
            type="submit"
            className="transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-auto uppercase"
        >{ label }
        </button>
    )
}

export default UiButtonSubmit;