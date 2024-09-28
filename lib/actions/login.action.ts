"use server"

import * as z from "zod"
// import { signIn } from "@/auth"

import { LoginSchema } from "@/lib/validations";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) {
       return {
           error: "Invalid fields!",
       }
    }

    // await signIn("credentials", validated)

    return {
        success: "done."
    }
}