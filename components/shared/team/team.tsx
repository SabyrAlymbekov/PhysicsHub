import React from 'react';
import Person from "@/components/shared/team/person";
import {getTeamMembers} from "@/lib/actions/team/getTeam";

const TeamPage = async () => {
    const team = await getTeamMembers("ADMIN");
    console.log(team)
    return (
        <>
            <section className="bg-gray-100 w-full py-5 md:py-20">
                <div className="container flex flex-col justify-center items-center">
                    <h1 className="text-8xl font-bold text-center pb-5">
                        Наша <span className="text-gradient">Команда</span>
                    </h1>
                    <p className="text-xl max-w-[800px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Blanditiis deserunt doloribus facilis fugit molestias similique sint soluta voluptatibus
                        voluptatum! Eligendi eos, eveniet ipsa laudantium quod reiciendis reprehenderit sed totam
                        vero!</p>
                </div>
            </section>
            <section className="container flex flex-col gap-10 w-full py-5 md:py-20">
                {
                    team && team.map((member, index) => (
                        <Person
                            key={index}
                            photo={member.image as string}
                            name={member.name as string}
                            status={member.rolesInTeam.join(', ')}
                            school={member.education.join(', ')}
                            description={member.achievements.join(',\n')}
                            id={member.id}
                        />
                    ))
                }
            </section>
        </>
    );
};

export default TeamPage;