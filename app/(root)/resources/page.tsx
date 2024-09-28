import React from "react"
import ResourcesTitle from "@/components/resources/ResourcesTitle";
import ResourcesList from "@/components/resources/ResourcesList";

const Resources = () => {
    return <div className="flex flex-col">
        <ResourcesTitle />
        <ResourcesList></ResourcesList>
    </div>
}

export default Resources;