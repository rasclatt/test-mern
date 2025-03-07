import React, { useState, ReactNode, useEffect } from 'react';
import { UserGetService } from '../components/users/service';
import { AccountContext } from './account.context';
import useToken from '../hooks/token.hook';
import { IUser } from '../components/users/interface';

export interface IAccountContext {
    account: IUser | null;
    setAccount: (user: IUser | null) => void;
    ready?: boolean;
}

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ account, setAccount ] = useState<IUser | null>(null);
    const [ ready, setReady ] = useState<{loading: boolean, ready: boolean}>({loading: false, ready: false});
    const { token } = useToken();
    useEffect(() => {
        if(token) {
            if(!ready.loading && !ready.ready) {
                setReady({loading: true, ready: false});
                UserGetService().then((data:IUser) => {
                    if(data?._id)
                        setAccount(data);
                    setReady({loading: false, ready: true});
                }).catch((e: {[k:string]: string | object }) => {
                    console.log(e);
                    setReady({loading: false, ready: true});
                });
            }
        } else {
            if(!ready.loading && !ready.ready)
                setReady({loading: false, ready: true});
        }
    }, [token, ready]);
    return (
        <AccountContext.Provider value={{ account, setAccount, ready: ready.ready }}>
            { !ready.loading && ready.ready && children }
        </AccountContext.Provider>
    );
};

