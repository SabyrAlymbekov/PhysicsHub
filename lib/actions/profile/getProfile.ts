import { db } from "@/lib/db";

export const getProfile = async (userId: string) => {
    try {
        const profile = await db.user.findUnique({
            where: { id: userId },
        });
        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}