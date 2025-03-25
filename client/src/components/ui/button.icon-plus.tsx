import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IUIButton } from './button.interface';

const UIButtonIconPlus = ({ onClickEvent }: IUIButton) => {
    return (
        <button
            style={{ float: 'right', marginBottom: '10px' }}
            className="transition duration-350 ease-in-out transform hover:scale-110 cursor-pointer text-red-500"
            onClick={ onClickEvent }
        >
            <AddCircleOutlineIcon />
        </button>
    )
}

export default UIButtonIconPlus;