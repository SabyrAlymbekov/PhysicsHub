import React from "react"

import dynamic from 'next/dynamic'

const ProfileForm = dynamic(() => import("@/components/profile/profileForm"), {
    loading: () => <p>Loading...</p>,
})

const ProfilePage = async ({params}: {params: {id: string}}) => {
    const {id} = params;

    return (
        <div className="container mt-10">
            <ProfileForm userId={id}></ProfileForm>
        </div>
    )
}

export default ProfilePage;