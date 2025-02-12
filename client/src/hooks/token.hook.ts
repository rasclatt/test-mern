import { useState, useEffect } from 'react';
import { cacheGet } from '../helpers/util';

const useToken = (): {setToken: (v: string) => void, token: string } => {
    const [token, setToken] = useState<string>(cacheGet('token', ''));

    useEffect(() => {
        try {
            const payload = JSON.parse(atob(token?.split('.')[1] || '') || '{}') || {};
            const expiration = payload?.exp || -1;
            if (Date.now() >= expiration * 1000) {
                localStorage.removeItem('token');
                setToken('');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }, [ token ]);

    return { token: token || '', setToken};
};

export default useToken;