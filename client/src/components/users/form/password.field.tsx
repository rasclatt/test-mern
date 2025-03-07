import React, { useCallback, useState, useEffect } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordGeneratorUtility from '../../utilities/password-gen.component';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { IUser } from '../interface';

const UsersFormPasswordFieldComponent = ({
    setPasswordValid,
    label = 'Generate Random Password',
    user,
    setUser,
    value,
    setValue,
    generator = true,
    passRequired = false,
    softRequired = false,
}: {
    setPasswordValid: (v: boolean) => void,
    value?: string,
    setValue?: (v: string) => void,
    label?: string,
    user?: IUser,
    setUser?: (v: any) => void,
    passRequired?: boolean,
    softRequired?: boolean,
    generator?: boolean,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrengthError, setPasswordStrengthError] = useState<string[]>([]);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const checkPasswordStrength = useCallback((password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNoSpaces = !/\s/.test(password);
        let pass: boolean = passRequired ? false : true;
        const errors: string[] = [];

        if (password.length > 0) {
            if (password.length < 13) {
                pass = false;
                errors.push('Password must be at least 13 characters long');
            }
            if (!hasUpperCase) {
                pass = false;
                errors.push('Password must contain at least one uppercase letter');
            }
            if (!hasLowerCase) {
                pass = false;
                errors.push('Password must contain at least one lowercase letter');
            }
            if (!hasNumbers) {
                pass = false;
                errors.push('Password must contain at least one number');
            }
            if (!hasSymbols) {
                pass = false;
                errors.push('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)');
            }
            if (!hasNoSpaces) {
                pass = false;
                errors.push('Password must not contain spaces');
            }
        }

        setPasswordStrengthError(errors);
        setPasswordValid(pass);
    }, [passRequired, setPasswordValid]);

    useEffect(() => {
        if(user?.password) {
            checkPasswordStrength(user?.password || '');
        } else if(value) {
            checkPasswordStrength(value);
        }
    }, [value, user?.password, checkPasswordStrength]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, func?: (v: string) => string) => {
        const { name, value } = e.target;
        if(typeof setUser === 'function') {
            setUser((prevState: IUser) => ({
                ...prevState,
                [name]: typeof func === "function" ? func(value) : value,
            }));
        } else {
            if(typeof setValue === 'function') {
                setValue(value);
            }
        }
    }, [ setUser, setValue ]);

    return (
        <>
            <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={user?.password || value || ''}
                onChange={(e: any) => handleChange(e, (v: string) => v.replace(/[\s]/i, ''))}
                fullWidth
                required={ passRequired || softRequired }
                margin="normal"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }}
                onBlur={() => setShowPassword(false)}
            />
            {passwordStrengthError.length > 0 && passwordStrengthError.map((v: string, i: number) => (
                <span key={i}>
                    <Typography variant="caption" color="error">{v}</Typography>
                    <br />
                </span>
            ))}
            { generator && (
            <div className='flex justify-end'>
                <PasswordGeneratorUtility
                    setUser={ (typeof setUser === 'function')? setUser : undefined }
                    setValue={ (typeof setValue === 'function')? setValue : undefined }
                    label={ label }
                    onClickEvent={ () => setShowPassword(true) }
                />
            </div>
            )}
        </>
    );
};

export default UsersFormPasswordFieldComponent;