import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ForumsDeleteService } from './services';
import { useModalHook } from '../modal/hook';
import { toast } from 'react-toastify';
import React from 'react';
import UITableActionsButtons from '../ui/buttons.table-actions';
import ModalTemplateSimple from '../modal/templates/simple';

interface IForumsComponent
{
    rows: any[];
    setRows: (rows: any[]) => void;
    setRow: (data: any) => void;
    reset?: () => void;
    onEventClick?: () => void;
}

const ForumsComponent: React.FC<IForumsComponent> = ({ rows, setRow, reset, onEventClick }) => {
    const { setModalSettings, closeModal } = useModalHook();

    const editable: boolean = false;
    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', editable, flex: 1 },
        { field: 'description', headerName: 'Description', editable, flex: 2 },
        { field: 'category', headerName: 'Category', editable },
        { field: 'action', headerName: ' ', renderCell: (e) => (
            <UITableActionsButtons
                onEditEvent={ () => {
                    if(typeof onEventClick === 'function')
                        onEventClick();
                    setRow(e.row)
                } }
                onDeleteEvent={ () => {
                    setModalSettings({ title: `Delete "${e.row.title}" Forum?`,content: (
                        <ModalTemplateSimple
                            buttons={[
                                {
                                    label: 'Delete',
                                    clickEvent: () => ForumsDeleteService(e.row._id).then((r) => {
                                        if(r.success) {
                                            toast.success(`Forum "${e.row.title}" deleted successfully.`);
                                            if(typeof reset === 'function') 
                                                reset();
                                            closeModal();
                                        } else {
                                            toast.error(r.error || 'There was an error deleting the forum.');
                                        }
                                    }).catch((e: any) => {
                                        toast.error(e.message || 'There was an error deleting the forum.');
                                    }),
                                },
                            ]}
                        />),
                        autoWidth: true,
                    });
                }}
            />
        ) },
    ];

    return (
        <DataGrid
            getRowId={(row) => row._id }
            rows={ rows }
            columns={ columns }
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            rowCount={rows.length}
            pageSizeOptions={[5]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            processRowUpdate={(row) => {
            }}
            style={{ minHeight: 400, width: '100%' }}
        />
    );
};

export default ForumsComponent;