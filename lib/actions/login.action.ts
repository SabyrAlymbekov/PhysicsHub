"use server"

import * as z from "zod"
import { signIn } from "@/auth"

import { LoginSchema } from "@/lib/validations";
import {revalidatePath} from "next/cache";
import {AuthError} from "next-auth";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) {
       return {
           error: "Invalid fields!",
       }
    }

    const dataToSend = {
        email: validated.data.email,
        password: validated.data.password,
        redirectTo: "/"
    }
    try {
        await signIn("credentials", dataToSend);
    } catch (error: any) {
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
    // revalidatePath("/");
    return {
        success: "done."
    }
}

export const loginWithGoogle = async () => {
    try {
        await signIn("google", { redirectTo: "/" })
    } catch (error) {
        return {
            error: "Internal server Error!",
        }
    }
    revalidatePath("/")
    return {
        success: "done."
    }
}