import SignInComponent from "../../components/permission/sign-in";
import PermissionUserPrivate from "../../components/permission/user/private";
import UpdateUserProfile from "../../components/users/update.component";
import Template from "../../tempates/base";

const AccountUpdatePage = () => {
    // Get the current URL for reloading the page on successful login
    const currentHref = window.location.href;
    return (
        <Template
            title="Update Profile"
        >
            <PermissionUserPrivate
                redirect="#"
                def={
                    <SignInComponent
                        redirect={ currentHref }
                    />
                }
            >
                <UpdateUserProfile />
            </PermissionUserPrivate>
        </Template>
    )
}

export default AccountUpdatePage;