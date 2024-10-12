"use client"

import React from "react"
import {useRouter} from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const SignInButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
    const router = useRouter();

    const OnClick = () => {
        router.push('/signin');
    }

    if (mode === "modal") {
        return <div>
            {/*TODO: implement modal*/}
        </div>
    }

    return (
        <span className="cursor-pointer" onClick={OnClick}>
            {children}
        </span>
    )
}