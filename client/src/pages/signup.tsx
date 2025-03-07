import React, { useEffect } from 'react';
import SignInComponent from '../components/permission/sign-in';
import useToken from '../hooks/token.hook';
import Template from '../tempates/base';
/**
 * @description Shows the sign in page or redirects back to home page
 */
interface ISignUpPage {
    redirect?: string;
}

const SignUpPage: React.FC = ({ redirect = '/' }: ISignUpPage) => {
    const { token } = useToken();
    useEffect(() => {
      if(token) {
        window.location.href = redirect;
      }
    }, [ token ])
    
    return (
        !token && (
            <Template>
                <SignInComponent redirect='/' />
            </Template>
        )
    );
};

export default SignUpPage;