import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/Google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/lib/actions/authActions";
import bcrypt from "bcryptjs"

export const authConfig: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@gmail.com"
                },
                password: { label: "Password", type: "password", placeholder: "password",}
            },
            async authorize(credentials) {
                if (!credentials || !credentials?.email || !credentials?.password) {
                    return null;
                }
                const email = credentials.email as string;
                const user = await getUserByEmail(email);
               if (user) {
                   const isMatch = bcrypt.compareSync(
                       credentials.password as string,
                       user.hashedPassword as string,
                   )
                   if (isMatch) {
                       return user;
                   } else {
                       throw new Error("Incorrect password!")
                   }
               } else {
                   return null;
               }
            }
        })
    ],
    pages: {
        signIn: "/signin",
        signUp: "/signup"
    }
}