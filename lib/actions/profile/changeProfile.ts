"use server"

import {db} from "@/lib/db"
import type {ChangeProfileProps} from "@/types/actionsTypes";
import {currentUser} from "@/lib/actions/authActions";
import {profileSchema} from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const changeProfile = async (data: ChangeProfileProps, usertochangeID?: string) => {
    try {
        let userId = "";
        if (usertochangeID) {
            userId = usertochangeID;
        } else {
            const user = await currentUser();
            userId = user.id;
        }
        const checkedData = profileSchema.safeParse(data)
        if (!checkedData?.success) {
            console.log(checkedData.error.errors[0].message)
            return {
                error: checkedData.error.errors[0].message
            }   
        }
        console.log(checkedData, userId)
        await db.user.update({
            where: {
                id: userId
            },
            data: checkedData.data
        });
        revalidatePath(`/`)
        return {
            message: "Success"
        }
    } catch (e) {
        return {
            error: "Internal server error! Please try again."
        }
    }
}