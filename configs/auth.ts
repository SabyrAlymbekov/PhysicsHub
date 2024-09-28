import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/Google";
import CredentialsProvider from "next-auth/providers/credentials";
import {LoginSchema} from "@/lib/validations";
import * as z from "zod";

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username",
                },
                password: { label: "Password", type: "password", placeholder: "password",}
            },
            async authorize(credentials) {
                console.log(credentials);
                return {
                    email: "test@gmai.com",
                    password: "njqwdosamjf"
                }
            }
        })
    ],
    pages: {
        signIn: "/signin",
        signUp: "/signup"
    }
}