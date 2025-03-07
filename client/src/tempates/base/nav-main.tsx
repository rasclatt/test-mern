import UiSignOutButton from "../../components/ui/button.signout";
import { useAccount } from "../../hooks/account.hook"
import { ReactNode, useState } from 'react';
import LogoImg from '../../media/images/logo.png';
import { NavLink } from "react-router-dom";
import useToken from "../../hooks/token.hook";

interface IMenuNavObject {
    path: string,
    content: string | ReactNode,
    display: boolean,
    children?: IMenuNavObject[]
}

interface IMainNav
{
    logo?: string
}

const MainNav = ({ logo } : IMainNav) => {
    const { account, ready } = useAccount();
    const { token } = useToken();
    const pages: IMenuNavObject[] = [
        {
            path: '/',
            content: 'Home',
            display: true
        },
        {
            path: '/account',
            content: 'Account',
            display: true,
            children: [
                {
                    path: '/account/update',
                    content: 'Update',
                    display: (ready && account?._id)? true : false
                },
                {
                    path: '#',
                    content: <UiSignOutButton styles={ false } />,
                    display: (ready && account?._id && token)? true : false
                },
                {
                    path: '/sign-in',
                    content: 'Sign In',
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
                            <a href={page.path} className="block px-4 py-2">{page.content}</a>
                            {page.children && (
                                <ul className="absolute left-0 hidden mt-0 space-y-2 bg-white rounded-md shadow-lg group-hover:block">
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
        </nav>
    );
}

export default MainNav;