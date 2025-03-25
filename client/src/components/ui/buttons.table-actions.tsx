import { Tooltip } from "@mui/material";
import { IComponentChildren } from '../../interfaces/children.interface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IUITableActionsButtons extends IComponentChildren
{
    onEditEvent: (row: any) => void;
    onDeleteEvent: (row: any) => void;
    disableEdit?: boolean;
    disableDelete?: boolean;
    tooltipOnDelete?: string;
    tooltipOnEdit?: string;
}

const UITableActionsButtons = ({ children, onEditEvent, onDeleteEvent, disableEdit, disableDelete, tooltipOnDelete, tooltipOnEdit }: IUITableActionsButtons) => {
    return (
    <div className="flex justify-content-center items-center gap-2">
        { children }
        { typeof onEditEvent === "function" && (
        <button disabled={ disableEdit } onClick={ onEditEvent } className={ disableEdit? `opacity-50 cursor-not-allowed` : ''} >
            <Tooltip title={ tooltipOnEdit || '' }><span><EditIcon /></span></Tooltip>
        </button>) }
        { typeof onDeleteEvent === "function" && <button disabled={ disableDelete } className={ disableDelete? `opacity-50 cursor-not-allowed` : ''} onClick={ onDeleteEvent }>
            <Tooltip title={ tooltipOnDelete || ''}><span><DeleteIcon /></span></Tooltip>
        </button> }
    </div>
    )
};

export default UITableActionsButtons;