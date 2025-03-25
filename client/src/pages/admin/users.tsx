import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IUser } from "../../components/users/interface";
import { UserDeleteService, UserGetAllService } from "../../components/users/service";
import { useAccount } from "../../hooks/account.hook";
import { useModalHook } from "../../components/modal/hook";
import { toast } from "react-toastify";
import { ComponentState, ComponentStateLoading, ComponentStateReady, IComponentState } from "../../interfaces/http.interface";
import PermissionUsergroup from "../../components/permission/user/usergroup";
import Template from "../../tempates/base";
import UpdateUserProfile, { onSubmitUserUpdateEvent, UserGroupSelectComponent } from "../../components/users/update.component";
import EmailIcon from '@mui/icons-material/Email';
import EditOffIcon from '@mui/icons-material/EditOff';
import UITableActionsButtons from "../../components/ui/buttons.table-actions";
import ModalTemplateSimple from "../../components/modal/templates/simple";
import UIButtonGeneric from "../../components/ui/button.generic";
import UIButtonIconPlus from "../../components/ui/button.icon-plus";

const UserTypes = {
    1: 'Super Admin',
    2: 'Admin',
    3: 'User',
}

const AdminUsersPage = () => {
    const { account } = useAccount();
    const [ ready, setReady ] = useState<IComponentState>(ComponentState);
    const [ rows, setRows ] = useState<IUser[]>([]);
    const { closeModal, setModalSettings } = useModalHook();

    const isAllowedToEdit = (usergroup: string): boolean => {
        const myUsergroup: number = parseInt(account?.usergroup || '3');
        const currentUsergroup: number = parseInt(usergroup || '3');
        return myUsergroup <= currentUsergroup;
    }

    const deleteUser = async (id: string) => {
        setReady(ComponentStateLoading);
        try {
            const r = await UserDeleteService(id);
            if(r.success) {
                toast.success('User deleted successfully.');
                getUsers();
                closeModal();
            } else {
                toast.error('There was an error deleting the user.');
            }
            setReady(ComponentStateReady);
        } catch (e: any) {
            toast.error(e.message);
            setReady(ComponentStateReady);
        }
    }


    const columns: GridColDef[] = [
        { field: 'first_name', headerName: 'First Name', editable: true },
        { field: 'last_name', headerName: 'Last Name', editable: true },
        { field: 'email', headerName: 'Email', flex: 1, renderCell: (e) => <a className="underline" href={`mailto:${e.value}`}><EmailIcon />&nbsp;{e.value}</a> },
        { field: 'usergroup', headerName: 'Usergroup', minWidth: 160, renderCell: (r) => {
            const usergroup: string = UserTypes[r.value as keyof typeof UserTypes];
            if(!isAllowedToEdit(r.value)) {
                return usergroup;
            }
            return (<UserGroupSelectComponent size="small" currentUsergroup={r.value || '3' } handleSelectChange={(e) => {
                const newUsergroup = e.target.value;
                setReady(ComponentStateLoading);
                onSubmitUserUpdateEvent(undefined, () => {}, { ...r.row, usergroup: newUsergroup }, setReady, undefined, undefined, () => getUsers());
            }} />)
        }
        },
        { field: ' ', renderCell: (r) => (
            parseInt(account?.usergroup || '3') <= parseInt(r.row.usergroup) &&
                <PermissionUsergroup
                    usergroup={account?.usergroup || '2'}
                    def={ <EditOffIcon /> }
                >
                    <UITableActionsButtons
                        onEditEvent={() => {
                            setModalSettings({ title: 'Edit User', content: (
                                <UpdateUserProfile
                                    onSuccessEvent={ getUsers }
                                    userData={ r.row }
                                    rightButtons={ <UIButtonGeneric label="Cancel" onClickEvent={closeModal} /> }
                                />)
                            });
                        }}
                        onDeleteEvent={() => {
                            setModalSettings({ title: 'Delete User?',content: (
                                <ModalTemplateSimple
                                    buttons={[
                                        { label: 'Delete', clickEvent: () => deleteUser(r.row._id) },
                                    ]}
                                />),
                                autoWidth: true,
                            });
                        }}
                        disableDelete={ r.row.email === account?.email }
                        tooltipOnDelete={ r.row.email === account?.email? 'You can not delete your own account.' : '' }
                    />
                </PermissionUsergroup>
        ), align: 'right' }
    ];

    const getUsers = () => {
        if(!ready.loading)
            setReady(ComponentStateLoading);
        UserGetAllService().then((r) => {
            if(r.success) {
                setRows(r.data);
            }
            setReady(ComponentStateReady);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);
        

    return (
        <Template
            title='Admin Users'
            pageClassName='admin-users'
        >
            <div style={{ minHeight: 400, width: '99%', }} className={`${!ready.ready ? 'disabled-block' : ''}`}>
                <UIButtonIconPlus
                    onClickEvent={() => setModalSettings({ title: 'Add New User', content: (
                        <UpdateUserProfile
                            onSuccessEvent={ () => {
                                getUsers();
                                closeModal();
                            }}
                            userData={{}}
                            action="create"
                            rightButtons={ <button className="transition duration-500 ease-in-out border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded-lg w-auto uppercase" onClick={ closeModal }>Cancel</button> }
                        />)})
                    }
                />
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
                        setReady(ComponentStateLoading);
                        onSubmitUserUpdateEvent(undefined, () => {}, row, setReady, undefined, undefined, () => getUsers()); 
                    }}
                    style={{ minHeight: 400, width: '100%' }}
                />
            </div>
        </Template>
    )
}

export default AdminUsersPage;


