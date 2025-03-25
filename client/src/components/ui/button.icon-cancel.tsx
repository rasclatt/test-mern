import CancelIcon from '@mui/icons-material/Cancel';
import { IUIButton } from './button.interface';

const UIButtonIconCancel = ({ onClickEvent }: IUIButton) => {
    return (
        <button
            style={{ float: 'right', marginBottom: '10px' }}
            className="transition duration-350 ease-in-out transform hover:scale-110 cursor-pointer text-red-500"
            onClick={ onClickEvent }
        >
            <CancelIcon />
        </button>
    )
}

export default UIButtonIconCancel;