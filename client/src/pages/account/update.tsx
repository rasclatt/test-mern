import PermissionUserPrivate from "../../components/permission/user/private";
import UpdateUserProfile from "../../components/users/update.component";
import Template from "../../tempates/base";

const AccountUpdatePage = () => {
    return (
        <Template>
            <PermissionUserPrivate>
                <UpdateUserProfile />
            </PermissionUserPrivate>
        </Template>
    )
}

export default AccountUpdatePage;