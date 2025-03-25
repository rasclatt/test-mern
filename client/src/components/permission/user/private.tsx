import PermissionUsergroup from "./usergroup";

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
    return (
        <PermissionUsergroup
            redirect={redirect}
            def={def}
            usergroup='3'
        >
            { children }
        </PermissionUsergroup>)
}

export default PermissionUserPrivate;