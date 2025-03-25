import AccountUpdatePage from "../pages/account/update";
import ForumPage from "../pages/forum";
import HomePage from "../pages/homepage";
import SignUpPage from "../pages/signup";

const routes = [
    {
        path: '/',
        component: (<HomePage />),
    },
    {
        path: '*',
        component: (<HomePage />),
    },
    {
        path: '/account',
        component: (<AccountUpdatePage />),
    },
    {
        path: '/sign-in',
        component: (<SignUpPage />),
    },
    {
        path: '/forum',
        component: (<ForumPage />),
    },
];

export default routes;