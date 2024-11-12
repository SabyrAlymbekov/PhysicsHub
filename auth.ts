import NextAuth from "next-auth"
import {authConfig} from "@/configs/auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {UserRole} from "@prisma/client";
import {getUserById} from "@/lib/actions/authActions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token } ) {
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (existingUser) {
                token.name = existingUser.name;
                token.email = existingUser.email;
                token.role = existingUser.role
            } else {
                return token;
            }
            return token
        },
        session({ session, token }) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email as string;
            }
            return session
        },
    },
    pages: {
        signIn: "/signin",
    },
    ...authConfig,
})