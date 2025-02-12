import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAccount } from '../hooks/account.hook';
import { cacheDestroy } from '../helpers/util';
import React from 'react';
import UpdateUserProfile from '../components/users/update.component';
import useToken from '../hooks/token.hook';

const HomePage: React.FC = () => {
    const { token } = useToken();
    const { account } = useAccount();
    return (
        <div className='col-count-3 gapped'>
            <div className='start2'>
                { !token && <Typography variant='h5'>Home Page</Typography>}
                { account && <Typography variant='h6'>Welcome {account.first_name} {account.last_name}</Typography> }
                <Typography variant='body1'>This is the home page of our application.</Typography>
                { !token && <NavLink className='text-center' to="/sign-in">Sign In</NavLink>}
                { token && <UpdateUserProfile /> }
                { token &&  <Button variant="text" color="primary" className='mt-4' onClick={() => {
                    cacheDestroy('token');
                    window.location.reload();
                }}>Sign Out</Button>}
            </div>
        </div>
    );
};

export default HomePage;