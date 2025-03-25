import PermissionUsergroup from "../components/permission/user/usergroup";
import AdminUsersPage from "../pages/admin/users";

const routes = [
    {
        path: "/admin/users",
        component: 
            (<PermissionUsergroup
                usergroup={'2'}
                redirect='/'
            >
                <AdminUsersPage />
            </PermissionUsergroup>)
    }
];

export default routes;