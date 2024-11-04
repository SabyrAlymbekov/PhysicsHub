import React from 'react';
import {getTeamMembers} from "@/lib/actions/team/getTeam";
import type {User} from "@prisma/client";
import {TeamMember} from "@/components/home/team";

const TeamPage = async () => {
    const teamMembers = await getTeamMembers("TEAM");
    const admins = await getTeamMembers("ADMIN");
    
    return (
        <>
            <section className="bg-gray-100 w-full py-20">
                <div className="container flex flex-col">
                    <h1 className="title">
                        Наша <span className="text-gradient">команда</span>
                    </h1>
                    <h3 className="subtitle mt-4">
                        МЫ - независимая команда школьников-физиков энтузиастов.
                        <br/>
                        Мы развиваем сообщество физиков и помогаем людям.
                        <br/>
                        Наша главная цель сделать изучение физики <span className="text-gradient">легким, понятным, а главное доступным</span>!
                    </h3>
                </div>
            </section>
            <h2 className="text-5xl max-sm:text-3xl my-10 font-bold container block uppercase">
                наша команда состоит ИЗ {teamMembers!.length + admins!.length} ЧЕЛОВЕК 
            </h2>
            <h2 className="text-4xl max-sm:text-2xl mb-10 font-bold container block uppercase">Администрация</h2>
            <section className="container flex flex-row flex-wrap gap-10">
                {
                    admins && admins.map((teamMember: User, index: number) => (
                        <TeamMember teamMember={teamMember} key={index}></TeamMember>
                    ))
                }
            </section>
            <h2 className="text-4xl max-sm:text-2xl my-10 font-bold container block uppercase">Участники</h2>
            <section className="container flex flex-row flex-wrap gap-10">
                {
                    teamMembers && teamMembers.map((teamMember: User, index: number) => (
                        <TeamMember teamMember={teamMember} key={index}></TeamMember>
                    ))
                }
            </section>
        </>
    );
};

export default TeamPage;
