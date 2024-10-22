import React from "react"
import {getTeamMembers} from "@/lib/actions/team/getTeam";
import type {User} from "@prisma/client";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import ImageFallback from "@/components/fallbackImage"; // Импортируем ImageFallback
import Link from "next/link";

export const TeamMember = ({teamMember}: {
    teamMember: User
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    href={`/team#${teamMember.id}`}
                >
                    <ImageFallback
                        src={teamMember.realImage || teamMember.image || "/assets/icons/avatar.png"}
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
                        src={teamMember.image as string || "/assets/icons/avatar.png"}
                        fallbackSrc="/assets/icons/avatar.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{teamMember.realName || teamMember.name}</h4>
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
    // const teamMembers = await getTeamMembers("TEAM");
    const admins = await getTeamMembers("ADMIN");
    console.log(admins);
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
                {/*{*/}
                {/*    teamMembers && teamMembers.map((teamMember: User, index: number) => (*/}
                {/*        <TeamMember teamMember={teamMember} key={index}></TeamMember>*/}
                {/*    ))*/}
                {/*}*/}
            </div>
        </section>
    )
}

export default TeamSection;
