"use server"

import {db} from "@/lib/db"
import type {ChangeProfileProps} from "@/types/actionsTypes";
import {currentUser} from "@/lib/actions/authActions";
import {profileSchema} from "@/lib/validations";

export const changeProfile = async (data: ChangeProfileProps) => {
    try {
        const user = await currentUser();
        const checkedData = profileSchema.safeParse(data)
        if (!checkedData?.success) {
            return {
                error: "Invalid fields!"
            }
        }
        const res = await db.user.update({
            where: {
                id: user.id
            },
            data: checkedData
        });
        return res;
    } catch (e) {
        console.error(e)
        return {
            error: "Internal server error! Please try again."
        }
    }
}