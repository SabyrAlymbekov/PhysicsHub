import React from "react"
import ProfileForm from "@/components/profile/profileForm"
import { Metadata } from "next";
import { getProfile } from "@/lib/actions/profile/getProfile";
import { User } from "@prisma/client";
import { currentUser } from "@/lib/actions/authActions";
import { UserSessionT as user } from "@/types/user";
import { notFound } from "next/navigation";

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const profile: User | null = await getProfile(params.id); 
    return {
        title: profile?.name || "Profile",
        description: profile?.bio || "Profile",
        openGraph: {
            images: [
                {
                    url: profile?.image || "/assets/icons/avatar.png",
                    width: 150,
                    height: 150,
                    alt: "Profile avatar"
                }
            ]
        },
    }
}

const ProfilePage = async ({params}: {params: {id: string}}) => {
    const {id} = params;
    const profile: User | null = await getProfile(id);
    const user: user | null = await currentUser();

    if (profile === null) {
        notFound();
    }
    
    return (
        <div className="container mt-10">
            <ProfileForm profile={profile} user={user}></ProfileForm>
        </div>
    )
}

export default ProfilePage;