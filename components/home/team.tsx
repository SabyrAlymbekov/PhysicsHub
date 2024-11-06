import React from "react"
import {getTeamMembers} from "@/lib/actions/team/getTeam";
import type {User} from "@prisma/client";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";
import ImageFallback from "../fallbackImage";

export const TeamMember = ({teamMember}: {
    teamMember: User
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    href={`/profile/${teamMember.id}`}
                >
                    <ImageFallback
                        src={teamMember.image || "/assets/icons/avatar.png"}
                        fallbackSrc="/assets/icons/avatar.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-full w-[100px] h-[100px]"
                    />
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
                <div className="flex justify-between space-x-4">
                    <ImageFallback
                        src={teamMember.image || "/assets/icons/avatar.png"}
                        fallbackSrc="/assets/icons/avatar.png"
                        alt="logo"
                        width={50}
                        height={50}
                        className="rounded-full w-[50px] h-[50px]"
                    />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{teamMember.name}</h4>
                        <p className="text-sm">
                            {
                                teamMember.rolesInTeam.join(', ')
                            }
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

const TeamSection = async () => {
    const teamMembers = await getTeamMembers("TEAM");
    const admins = await getTeamMembers("ADMIN");
    return (
        <section className="my-24 container">
            <div className="">
                <h1 className="text-center title uppercase">
                    Наша команда
                </h1>
                <h3 className="subtitle mt-4">
                    Команда проекта <span className="text-gradient">Physics Hub</span> состоит из энтузиастов,
                    <br/>
                    готовых помочь в развитии науки среди людей.
                    <br/>
                    Наша главная цель сделать изучение физики <span className="text-gradient">легким</span>, <span className="text-gradient">понятным</span>, а главное  <span className="text-gradient">доступным</span>! 
                </h3>
            </div>
            <h1 className="text-3xl font-bold mt-14 text-center"> Админы </h1>
            <div className="flex flex-row flex-wrap justify-center gap-10 mt-4">
                {
                    admins && admins.map((teamMember: User, index: number) => (
                        <TeamMember teamMember={teamMember} key={index}></TeamMember>
                    ))
                }
            </div>
            <h1 className="text-3xl font-bold mt-7 text-center"> Участники </h1>
            <div className="flex flex-row flex-wrap justify-center gap-10 mt-4">
                {
                   teamMembers && teamMembers.map((teamMember: User, index: number) => (
                       <TeamMember teamMember={teamMember} key={index}></TeamMember>
                    ))
                }
            </div>
        </section>
    )
}

export default TeamSection;
