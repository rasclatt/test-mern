
import useToken from "../../../hooks/token.hook";
import { useEffect } from "react";
import { useAccount } from "../../../hooks/account.hook";
import { useNavigate } from "react-router-dom";

export interface IComponentChildren
{
    children?: React.ReactNode;
}

interface IPermissionUserAdmin extends IComponentChildren
{
    redirect?: string,
    def?: React.ReactNode | string | null,
    usergroup?: string
}

const PermissionUsergroup = ({ children, usergroup = '3', redirect = '/', def = null }: IPermissionUserAdmin) => {
    const { account, ready } = useAccount();
    const { token } = useToken();
    const nav = useNavigate();

    const currentUsergroup: number = parseInt(account?.usergroup || '0');
    const allowedUsergroup: number = parseInt(usergroup);
    const allowed: boolean = currentUsergroup <= allowedUsergroup;

    useEffect(() => {
        if(!['#',''].includes(redirect) && def === null) {
            if(!token) {
               nav(redirect);
            } else {
                if(ready && !account?._id || !allowed) {
                    nav(redirect);
                }
            }
        }
    }, [ account?._id, token, ready, def, redirect ]);
    
    return (
        ready && account?._id && allowed && token? children : def
    );
}

export default PermissionUsergroup;