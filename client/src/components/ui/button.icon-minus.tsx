import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IUIButton } from './button.interface';

const UIButtonIconMinus = ({ onClickEvent }: IUIButton) => {
    return (
        <button
            style={{ float: 'right', marginBottom: '10px' }}
            className="transition duration-350 ease-in-out transform hover:scale-110 cursor-pointer text-red-500"
            onClick={ onClickEvent }
        >
            <RemoveCircleIcon />
        </button>
    )
}

export default UIButtonIconMinus;