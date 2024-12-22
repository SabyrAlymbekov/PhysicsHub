import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface AuthWrapperProps {
    children: React.ReactNode;
    type: "Sign In" | "Sign Up";
    header: string;
    description: string;
}

const AuthWrapper = ({ children, type, header, description  }: AuthWrapperProps) => {
    const toGo = (type === "Sign In") ? "/signup" : "/signin";

    return (
            <div className="lg:p-8">
                <Link
                    href={toGo}
                    className="absolute right-4 top-4 md:right-8 md:top-8"
                >
                    <Button variant="ghost">
                        {type === "Sign In" ? "Sign Up" : "Login"}
                    </Button>
                </Link>
                <div className="flex flex-col m-auto justify-center items-center mb-3 lg:mb-6">
                    <h2 className="subtitle">Welcome to</h2>
                    <Link className="relative z-20 flex items-center text-lg font-medium text-center title-mini" href="/">
                        <Image
                            src="/assets/icons/logo.png"
                            width={85}
                            height={85}
                            className="mr-2 h-[50px] w-[50px] lg:h-[85px] lg:w-[85px]"
                            alt="logo"
                        ></Image>
                        Physics Hub
                    </Link>
                </div>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {header}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {/*<UserAuthForm />*/}
                    {children}
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Продолжая, вы соглашаетесь с нашими {" "}
                        <Link
                            href="https://physics-hub.com/terms-of-service"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Условиями использования
                        </Link>{" "}
                        , а также нашей {" "}
                        <Link
                            href="https://physics-hub.com/privacy-policy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Политикой конфиденциальности
                        </Link>
                        .
                    </p>
                </div>
            </div>
    )
}

export { AuthWrapper }
