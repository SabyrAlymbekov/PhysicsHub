import {db} from "@/lib/db";

type getTeamMembersT = "ADMIN" | "TEAM"

export const getTeamMembers = async (role: getTeamMembersT) => {
    try {
        const users = db.user.findMany({ where: {
            role
            } });
        return users;
    } catch (error) {
        console.log(error)
        return null;
    }
}
