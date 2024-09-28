import React from "react"
import {AuthWrapper} from "@/components/shared/auth/AuthWrapper";
import {UserSignUpForm} from "@/components/shared/auth/SignIn/UserSignUpForm";

const SignUpPage = () => {
    return <AuthWrapper type="Sign Up" header="Создать аккаунт" description="Введите электронную почту и пароль для создания нового аккаунта">
        <UserSignUpForm></UserSignUpForm>
    </AuthWrapper>
}

export default SignUpPage