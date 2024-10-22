"use server"

import {db} from "@/lib/db";
import {auth} from "@/auth";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};