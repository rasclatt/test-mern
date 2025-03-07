import { Button } from '@mui/material';
import { IUser } from '../users/interface';

interface IPasswordGeneratorUtility {
    label: string,
    onClickEvent?: (password?: string) => void,
    setUser?: (v: any) => void
    setValue?: (v: any) => void
}

const PasswordGeneratorUtility = ({ setValue, setUser, onClickEvent, label = 'Generate Random Password' }: IPasswordGeneratorUtility) => {
    const generateRandomPassword = (): string => {
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*(),.?":{}|<>';

        const allCharacters = upperCase + lowerCase + numbers + symbols;
        let password = '';

        // Ensure at least one character from each type
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];

        // Fill the rest of the password with random characters from all types
        for (let i = 4; i < 13; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }

        // Shuffle the password to ensure randomness
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        if (typeof onClickEvent === 'function') {
            onClickEvent(password);
        }
        return password;
    };

    return (
        <div>
            <Button variant="text" onClick={() => {
                if (typeof setValue === 'function') {
                    setValue(generateRandomPassword());
                }
                else if (typeof setUser === 'function') {
                    setUser((arr: IUser) => ({ ...arr, password: generateRandomPassword() }));
                }
            }}>{ label }</Button>
        </div>
    );
};

export default PasswordGeneratorUtility;