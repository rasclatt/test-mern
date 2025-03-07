import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAccount } from '../../hooks/account.hook';
import { UserUpdateService } from './service';
import { toast } from 'react-toastify';
import { IUser } from './interface';
import UsersFormPasswordFieldComponent from './form/password.field';

const UpdateUserProfile: React.FC = () => {
    const { account, setAccount } = useAccount();
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState<IUser>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [ passwordValid, setPasswordValid ] = useState<boolean>(true);

    useEffect(() => {
        if (account) {
            setUser(account);
        }
    }, [ account ]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        UserUpdateService(user).then((data) => {
            if (data?._id) {
                setUser(data);
                setAccount(data);
                toast.success('Profile updated successfully');
            }
            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });
    };


    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h5" gutterBottom>Update Profile</Typography>
            <form onSubmit={handleSubmit} className={`${loading ? 'disable-block' : ''} grid sm:grid-cols-1 md:grid-cols-2 gap-4`}>
                <TextField
                    label="First Name"
                    name="first_name"
                    value={user.first_name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    value={user.last_name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email || ''}
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
                (<Select
                    name="usergroup"
                    id="usergroup"
                    value={ user.usergroup || '3' }
                    onChange={ (e) => handleSelectChange(e) }
                    fullWidth
                    required
                >
                    <MenuItem value="3">Web</MenuItem>
                    <MenuItem value="2">Admin</MenuItem>
                    <MenuItem value="1">Super Admin</MenuItem>
                </Select>)}
                <div className='md:col-span-2 sm:col-span-1 flex justify-center'>
                    <button
                        disabled={ user.password !== '' && !passwordValid }
                        type="submit"
                        className={ `transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-auto uppercase ${user.password !== '' && !passwordValid? 'opacity-50 cursor-not-allowed' : ''}`}
                    >Update Profile</button>
                </div>
            </form>
        </Box>
    );
};

export default UpdateUserProfile;