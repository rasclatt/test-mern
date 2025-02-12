import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAccount } from '../../hooks/account.hook';
import { IUser } from '../../../../server/src/routers/users/interface';
import { UserUpdateService } from './service';
import { toast } from 'react-toastify';

const UpdateUserProfile: React.FC = () => {
    const { account, setAccount } = useAccount();

    const [user, setUser] = useState<IUser>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (account) {
            setUser(account);
        }
    }, [account]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        UserUpdateService(user).then((data) => {
            if (data?._id) {
                setUser(data);
                setAccount(data);
                toast.success('Profile updated successfully');
            }
        }).catch((e) => {
            console.error(e);
        });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h5" gutterBottom>Update Profile</Typography>
            <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Update Profile</Button>
            </form>
        </Box>
    );
};

export default UpdateUserProfile;