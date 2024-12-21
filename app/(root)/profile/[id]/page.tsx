import React, { Suspense } from "react"
import ProfileForm from "@/components/profile/profileForm"
const ProfilePage = async ({params}: {params: {id: string}}) => {
    const {id} = params;
    
    return (
        <div className="container mt-10">
            <Suspense fallback={<div>Loading...</div>}>
                <ProfileForm userId={id}></ProfileForm>
            </Suspense>
        </div>
    )
}

export default ProfilePage;