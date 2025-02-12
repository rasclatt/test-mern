import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { UserAuthPostService, UserCreatePostService } from './service';
import { IComponentChildren } from '../../../interfaces/children.interface';
import { toast } from 'react-toastify';
import useToken from '../../../hooks/token.hook';

interface ISignUpForm {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

interface ISignInComponent extends IComponentChildren {
    redirect?: string;
}

const SignInComponent = ({children, redirect}: ISignInComponent) => {
    const init: ISignUpForm = { email: '', password: '', first_name: '', last_name: '' };
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formData, setFormData ] = useState(init);

    const [ toggle, setToggle ] = useState<boolean>(false);
    const { token, setToken } = useToken();

    const submitAuth = (e: string, p: string) => {
        UserAuthPostService(e, p).then((data) => {
            if(!data.token) {
                toast.error(data?.message || 'An error occurred');
            } else {
                setToken(data.token);
                localStorage.setItem('token', data.token);
            }
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            toast.error(e.message);
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!loading)
            setLoading(true);
        submitAuth(email, password);
    };

    const onSubmitCreateEvent = (event: React.FormEvent) => {
        event.preventDefault();
        UserCreatePostService(formData).then((data) => {
            if(!data._id) {
                toast.error(data?.message || 'An error occurred');
            } else {
                setFormData(init);
                submitAuth(formData.email, formData.password);
                toast.success('User created successfully');
            }
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            toast.error(e.message);
        });
    };

    useEffect(() => {
        if(token && redirect) {
            window.location.href = redirect;
        }
    }, [token, redirect]);

    return (
        <>
        {!token && !toggle && (
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        disabled={ loading }
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
            </Container>
        )}

        { !token && toggle && (
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmitCreateEvent} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={ formData.email || '' }
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password || ''}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="first_name"
                        label="First Name"
                        id="first_name"
                        value={ formData.first_name || '' }
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="last_name"
                        label="Last Name"
                        id="last_name"
                        value={ formData.last_name || '' }
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                    <Button
                        disabled={ loading }
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            </Container>
        )}

        { !token && (
            <Button onClick={() => setToggle(!toggle)} fullWidth variant="text" color="primary" sx={{ mt: 3, mb: 2 }}>
                {toggle? 'Sign In' : 'Sign Up'}
            </Button>
        )}

        { token && !loading && (children || null)}
        </>
    
    );
};

export default SignInComponent;