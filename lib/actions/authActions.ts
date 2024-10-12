import {db} from "@/lib/db";
import {auth} from "@/auth";

export const getUserByEmail = async (email: string) => {
    try {
        const user = db.user.findUnique({ where: { email } });
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

// export const currentRole = async () => {
//     const session = await auth();
//     if (!session || !session.user?.role) {
//         return null;
//     }
//     return session.user.role;
// };