import { Typography } from '@mui/material';
import { useAccount } from '../hooks/account.hook';
import React from 'react';
import useToken from '../hooks/token.hook';
import Template from '../tempates/base';

const HomePage: React.FC = () => {
    const { token } = useToken();
    const { account } = useAccount();
    return (
        <Template>
            { !token && <Typography variant='h5'>Home Page</Typography>}
            { account && <Typography variant='h6'>Welcome {account.first_name} {account.last_name}</Typography> }
            <Typography variant='body1'>This is the home page of our application.</Typography>
        </Template>
    );
};

export default HomePage;