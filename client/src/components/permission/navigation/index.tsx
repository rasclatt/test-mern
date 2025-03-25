import { NavLink } from "react-router-dom";
import { useAccount } from "../../../hooks/account.hook";
import useToken from "../../../hooks/token.hook";

interface INavLinkControlled
{
    to: string
    children: React.ReactNode | string
    className?: string
    def?: string
    accessible?: boolean
}

const NavLinkControlled = ({ to, children, className, def, accessible = true }: INavLinkControlled) => {
    const { account, ready } = useAccount();
    const { token } = useToken();
    const current = (!token || !account?._id)? accessible? def : to : to;
    return (
        ready? <NavLink to={ current || '#' } className={ className || ''}>{ children }</NavLink> : null
    );
}

export default NavLinkControlled;