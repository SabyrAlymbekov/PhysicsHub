"use server"

import {db} from "@/lib/db";

type getTeamMembersT = "ADMIN" | "TEAM" | "ALL"

export const getTeamMembers = async (role: getTeamMembersT) => {
    try {
        if (role == "ALL") {
            const users = await db.user.findMany({
                where: {
                    OR: [
                        {role: "ADMIN"},
                        {role: "TEAM"}
                    ]
                }
            });
            return users;
        }
        const users = await db.user.findMany({ where: {
            role
            } });
        return users;
    } catch (error) {
        console.log(error)
        return [];
    }
}
