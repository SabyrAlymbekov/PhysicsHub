import React from "react"
import Logout from "@/components/shared/auth/Logout-button";
// import {currentUser} from "@/lib/actions/authActions";
// import ProfileForm from "@/components/profile/profileForm";

const ProfilePage = async () => {
    // const user = await currentUser();

    return (
        <div className="container">
            {/*<ProfileForm></ProfileForm>*/}
            <Logout classname=""></Logout>
        </div>
    )
}

export default ProfilePage;