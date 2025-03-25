import React, { useState, useEffect } from 'react';
import { TextField, Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAccount } from '../../hooks/account.hook';
import { UserCreateService, UserUpdateService } from './service';
import { toast } from 'react-toastify';
import { IUser } from './interface';
import { ComponentState, ComponentStateLoading, ComponentStateReady, IComponentState } from '../../interfaces/http.interface';
import UsersFormPasswordFieldComponent from './form/password.field';

interface IUpdateUserProfile
{
    userData?: IUser
    rightButtons?: JSX.Element
    action?: 'create'
    onSuccessEvent?: (data?: IUser) => void
}

export const onSubmitUserUpdateEvent = (
    e: React.FormEvent<HTMLFormElement> | undefined,
    setUser: (user: IUser) => void,
    user: IUser,
    setReady: (ready: IComponentState) => void,
    userData?: IUser,
    setAccount?: (account: IUser) => void,
    onSuccessEvent?: (data?: IUser) => void,
    action?: 'create'
) => {
    if(e)
        e.preventDefault();
    setReady(ComponentStateLoading);
    const actionService = action === 'create'? UserCreateService(user) : UserUpdateService(user);
    actionService.then((data) => {
        if (data?._id) {
            setUser(data);
            if(!userData && typeof setAccount === 'function')
                setAccount(data);
            toast.success('Profile updated successfully');
        }
        setReady(ComponentStateReady);
        if(typeof onSuccessEvent === 'function')
            onSuccessEvent(data);
    }).catch(() => {
        setReady(ComponentStateReady);
    });
};

const UpdateUserProfile = ({ userData, rightButtons, onSuccessEvent, action } : IUpdateUserProfile) => {
    const { account, setAccount } = useAccount();
    const [ ready, setReady ] = useState<IComponentState>(userData? ComponentStateReady : ComponentState);
    const [ user, setUser ] = useState<IUser>(userData || {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [ passwordValid, setPasswordValid ] = useState<boolean>(true);

    useEffect(() => {
        if (!userData && account) {
            setReady(ComponentStateReady);
            setUser(account);
        }
    }, [ account, userData ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, func?: (v: string) => string) => {
        const { name, value } = e.target;
        setUser((prevState: IUser) => ({
            ...prevState,
            [name]: typeof func === "function"? func(value) : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent, func?: (v: string) => string) => {
        const { name, value } = e.target;
        setUser((prevState: IUser) => ({
            ...prevState,
            [name]: typeof func === "function"? func(value) : value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => onSubmitUserUpdateEvent(e, setUser, user, setReady, userData, setAccount, onSuccessEvent, action);

    return (
        <Box sx={{ mt: 4 }}>
            <form
                onSubmit={handleSubmit}
                className={`${!ready.ready ? 'disable-block' : ''} grid sm:grid-cols-1 md:grid-cols-2 gap-4`}
            >
                { userData?._id && <input type='hidden' name='_id' value={ userData?._id } /> }
                { action && <input type='hidden' name="action" value={ action } /> }
                <TextField
                    label="First Name"
                    name="first_name"
                    value={ user.first_name || '' }
                    onChange={ handleChange }
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    value={ user.last_name || '' }
                    onChange={ handleChange }
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={ user.email || '' }
                    onChange={ handleChange }
                    fullWidth
                    margin="normal"
                    required
                />
                <div>
                    <UsersFormPasswordFieldComponent
                        user={ user }
                        setUser={ setUser }
                        setPasswordValid={ setPasswordValid }
                    />
                </div>
                { parseInt(account?.usergroup || '3') < 3 && 
                ( <UserGroupSelectComponent
                    size="small"
                    currentUsergroup={ user.usergroup || '3' }
                    handleSelectChange={ handleSelectChange }
                />) }
                <div className='md:col-span-2 sm:col-span-1 flex justify-center gap-4 mt-4'>
                    <button
                        disabled={ user.password !== '' && !passwordValid }
                        type="submit"
                        className={ `transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-auto uppercase ${user.password !== '' && !passwordValid? 'opacity-50 cursor-not-allowed' : ''}`}
                    >{action || 'Update'} Profile</button>
                    { rightButtons }
                </div>
            </form>
        </Box>
    );
};

export default UpdateUserProfile;


export const UserGroupSelectComponent = ({ size, currentUsergroup, handleSelectChange }: { size?: 'small' | 'medium', currentUsergroup: string, handleSelectChange: (e: SelectChangeEvent<string>) => void }) => {
    const { account } = useAccount();
    const allowedToChangeUsergroup = (num: number): boolean => !(parseInt(account?.usergroup || '3') <= num);
    return (
        <span>
        <Select
            name="usergroup"
            id="usergroup"
            value={ currentUsergroup || '3' }
            onChange={ (e) => handleSelectChange(e) }
            fullWidth
            required
            size={ size || 'medium' }
        >
            <MenuItem value="3" disabled={ allowedToChangeUsergroup(2) }>Web</MenuItem>
            <MenuItem value="2" disabled= { allowedToChangeUsergroup(2) }>Admin</MenuItem>
            <MenuItem value="1" disabled={ allowedToChangeUsergroup(1) }>Super Admin</MenuItem>
        </Select>
        </span>
    )
}