import { ReactNode, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { useAccount } from "../../hooks/account.hook"
import UiSignOutButton from "../../components/ui/button.signout";
import LogoImg from '../../media/images/logo.png';
import useToken from "../../hooks/token.hook";
import './styles.scss';
import SignInComponent from '../../components/permission/sign-in';
import ModalComponentContext from '../../components/modal/context';

interface IMenuNavObject {
    path: string,
    content: string | ReactNode,
    display: boolean,
    loggedOut?: string,
    children?: IMenuNavObject[]
}

interface IMainNav
{
    logo?: string
}

const MainNav = ({ logo } : IMainNav) => {
    const { setModalContent, setAutoWidth, openModal } = useContext(ModalComponentContext);
    const { account, ready } = useAccount();
    const { token } = useToken();

    const pages: IMenuNavObject[] = [
        {
            path: '/',
            content: 'Home',
            display: true
        },
        {
            path: '/forum',
            content: 'Forums',
            display: true
        },
        {
            path: '/admin/users',
            content: 'Tools',
            display: (ready && parseInt(account?.usergroup || '3') < 3)? true : false,
            children: [
                {
                    path: '/admin/users',
                    content: 'Edit Users',
                    display: true
                }
            ],
        },
        {
            path: '/account/update',
            content: 'Account',
            display: true,
            children: [
                {
                    path: '/account/update',
                    content: 'Update',
                    display: (ready && account?._id)? true : false,
                },
                {
                    path: '#',
                    content: <UiSignOutButton styles={ false } />,
                    display: (ready && account?._id && token)? true : false
                },
                {
                    path: '#',
                    content: <button className='no-appearance' onClick={ () => {
                        openModal();
                        setModalContent((
                            <SignInComponent
                                hardRedirect
                                redirect={ window.location.href }
                            />
                        ));
                        setAutoWidth(true);
                    } }>Sign In</button>,
                    display: (ready && !account?._id)? true : false
                }
            ]
        },
    ];

    const renderPages = (child: IMenuNavObject[], row: boolean = false) => {
        return (
            <ul className={ `flex space-x-0 ${row? 'flex-row' : 'flex-col'}` }>
                {child.map((page, index) => (
                    page.display && (
                        <li key={index} className="relative group">
                            <NavLink to={page.path} className="block px-4 py-2">{page.content}</NavLink>
                            {page.children && (
                                <ul className="absolute right-0 hidden mt-0 space-y-2 bg-white rounded-md shadow-lg group-hover:block">
                                    {renderPages(page.children)}
                                </ul>
                            )}
                        </li>
                    )
                ))}
            </ul>
        );
    };

    return (
    <nav className="main-nav w-full">
        <div className="col-count-3">
            <div className="start2 flex justify-between items-end">
                <div className="logo-container">
                    <NavLink to="/"><img src={ logo || LogoImg } alt="logo" /></NavLink>
                </div>
                <div>
                {renderPages(pages, true)}
                </div>
            </div>
        </div>
    </nav>);
}

export default MainNav;