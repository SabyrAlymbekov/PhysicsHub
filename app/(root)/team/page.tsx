import React from 'react';
import TeamPage from "@/components/shared/team/team"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Team",
    description: "Physics Hub team",
};

const Team = () => {
    return (
        <div className="flex flex-col">
            <TeamPage/>
        </div>
    );
};

export default Team;