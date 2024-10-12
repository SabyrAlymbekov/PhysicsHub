import React from "react"
import {getTeamMembers} from "@/lib/actions/team/getTeam";
import type {User} from "@prisma/client";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

const TeamMember = ({teamMember}: {
    teamMember: User
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    href={`/team#${teamMember.id}`}
                >
                    <Avatar>
                        <AvatarImage asChild src={teamMember.image as string || "/assets/icons/avatar.png"} width={100} height={100}>
                            <Image src={teamMember.image as string || "/assets/icons/avatar.png"} alt='logo' width={100} height={100} className="rounded-full"/>
                        </AvatarImage>
                        <AvatarFallback>
                            {
                                (
                                    teamMember.realName ?
                                        teamMember.realName[0].toUpperCase() +
                                        teamMember.realName[1].toUpperCase()
                                        :
                                        "AN"
                                )
                            }
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-50">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage asChild src={teamMember.image as string || "/assets/icons/avatar.png"}>
                            <Image src={teamMember.image as string || "/assets/icons/avatar.png"} alt='logo' width={60} height={60} className="rounded-full"/>
                        </AvatarImage>
                        <AvatarFallback>
                            {
                                (
                                    teamMember.realName ?
                                        teamMember.realName[0].toUpperCase() +
                                        teamMember.realName[1].toUpperCase()
                                        :
                                        "AN"
                                )
                            }
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{teamMember.realName || teamMember.name}</h4>
                        <p className="text-sm">
                            {
                                teamMember.rolesInTeam.join(', ')
                            }
                        </p>
                        {/*<div className="flex flex-row items-center space-x-2">*/}
                        {/*    {*/}
                        {/*        teamMember?.socials ?*/}
                        {/*            teamMember?.socials.map((social, index) => (*/}
                        {/*                <Avatar key={index}>*/}
                        {/*                    <AvatarImage asChild src={social.image as string || "/assets/icons/avatar.png"}>*/}
                        {/*                        <Image src={social.image as string || "/assets/icons/avatar.png"} alt='logo' width={60} height={60} className="rounded-lg"/>*/}
                        {/*                    </AvatarImage>*/}
                        {/*                    <AvatarFallback>*/}
                        {/*                        {*/}
                        {/*                            (*/}
                        {/*                                social.name ?*/}
                        {/*                                    social.name[0].toUpperCase() +*/}
                        {/*                                    social.name[1].toUpperCase()*/}
                        {/*                                    :*/}
                        {/*                                    "AN"*/}
                        {/*                            )*/}
                        {/*                        }*/}
                        {/*                    </AvatarFallback>*/}
                        {/*                </Avatar>*/}
                        {/*            )) : ""*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

const TeamSection = async () => {
    const teamMembers = await getTeamMembers("TEAM");
    const admins = await getTeamMembers("ADMIN");
    console.log(teamMembers);
    return (
        <section className="my-24 container">
            <div className="">
                <h1 className="text-center title uppercase">
                    Наша команда
                </h1>
                <h3 className="subtitle mt-4">
                    МЫ - независимая команда школьников-физиков энтузиастов.
                    <br/>
                    Мы развиваем сообщество физиков и помогаем людям.
                    <br/>
                    Наша главная цель сделать изучение физики <span className="text-gradient">легким, понятным, а главное доступным</span>!
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
            <h1 className="text-3xl font-bold mt-7 text-center"> Модераторы </h1>
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