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
        path: '/sign-in',
        component: (<SignUpPage />),
    }
];

export default routes;