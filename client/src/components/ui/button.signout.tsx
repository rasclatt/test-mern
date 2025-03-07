import { cacheDestroy } from "../../helpers/util";
import useToken from "../../hooks/token.hook";

interface IUiSignOutButton {
    label?: string;
    styles?: boolean;
}

const UiSignOutButton = ({ label, styles = false }: IUiSignOutButton) => {
    const { token } = useToken();
    return (
        token &&  (
        <button className={ styles? 'mt-4' : 'no-appearance' } onClick={() => {
            cacheDestroy('token');
            window.location.reload();
        }}>{ label || 'Sign Out' }</button>)
    )
}

export default UiSignOutButton;