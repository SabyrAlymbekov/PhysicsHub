import React from "react"
import Logout from "@/components/shared/auth/Logout-button";
import {currentUser} from "@/lib/actions/authActions";

const ProfilePage = async () => {
    const user = await currentUser();

    return (
        <div>
            <h1>Profile</h1>
            <h2>name = {user?.name}</h2>
            <h2>email = {user?.email}</h2>
            <Logout classname=""></Logout>
        </div>
    )
}

export default ProfilePage;