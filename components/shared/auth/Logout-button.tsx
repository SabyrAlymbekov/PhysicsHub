"use client"

import React from "react"
import {Button} from "@/components/ui/button";
import {logout} from "@/lib/actions/logout.action";

const Logout = ({ classname }: {classname: string}) => {
    return (
        <Button variant="outline" className={classname} onClick={() => logout()}>
            Выйти
        </Button>
    )
}

export default Logout