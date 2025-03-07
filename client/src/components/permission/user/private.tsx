
import { useEffect } from "react";
import { useAccount } from "../../../hooks/account.hook";
import useToken from "../../../hooks/token.hook";
import { useNavigate } from "react-router-dom";

export interface IComponentChildren
{
    children?: React.ReactNode;
}

interface IPermissionUserPrivate extends IComponentChildren
{
    redirect?: string,
    def?: React.ReactNode
}

const PermissionUserPrivate = ({ children, redirect = '/', def = null }: IPermissionUserPrivate) => {
    const { account, ready } = useAccount();
    const { token } = useToken();
    const nav = useNavigate();

    useEffect(() => {
        if(redirect) {
            if(!token) {
               nav(redirect);
            } else {
                if(ready && !account?._id) {
                    nav(redirect);
                }
            }
        }
    }, [ account?._id, token, ready ]);

    return (
        ready && account?._id && token? children : def
    );
}

export default PermissionUserPrivate;