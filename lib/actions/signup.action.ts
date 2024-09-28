"use server"

import * as z from "zod"

import { SignUpSchema } from "@/lib/validations";

export const signUpAction = async (values: z.infer<typeof SignUpSchema>) => {
    const validated = SignUpSchema.safeParse(values);

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    return {
        success: "done."
    }
}