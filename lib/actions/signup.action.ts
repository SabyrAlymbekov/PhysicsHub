"use server"

import * as z from "zod"

import { SignUpSchema } from "@/lib/validations";
import {saltAndHashPassword} from "@/lib/utils";
import {db} from "@/lib/db";
import {loginAction} from "@/lib/actions/login.action";
import {getUserByEmail} from "@/lib/actions/authActions";
import {AuthError} from "next-auth";

export const signUpAction = async (values: z.infer<typeof SignUpSchema>) => {
    const validated = SignUpSchema.safeParse(values);

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    const {email, password, username} = validated.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }
    const hashedPassword = saltAndHashPassword(password);
    await db.user.create({
        data: {
            email,
            hashedPassword,
            name: username
        }
    })
    try {
        const status = await loginAction({
            email: email,
            password: validated.data.password,
        });

        if (status.error) {
            throw new Error(status.error);
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid fields! "
                    }
                case "CallbackRouteError":
                    return {
                        error: error.cause?.err?.message,
                    }
                default:
                    return {
                        error: "Internal Server Error!",
                    }
            }
        }
        throw error;
    }

    return {
        success: "done."
    }
}