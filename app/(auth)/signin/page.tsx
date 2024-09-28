import React from "react"
import {AuthWrapper} from "@/components/shared/auth/AuthWrapper";
import {UserSignInForm} from "@/components/shared/auth/SignIn/UserSignInForm";

const SignInPage = () => {
    return <AuthWrapper type="Sign In" header="Войти в аккаунт" description="Введите электронную почту и пароль для входа в аккаунт">
        <UserSignInForm></UserSignInForm>
    </AuthWrapper>
}

export default SignInPage