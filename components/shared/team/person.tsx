import React from 'react';
import {PersonProps} from "@/types/componentsTypes";

const Person = ({ data }: {data: PersonProps}) => {
    const {name, description, education, rolesInTeam, achievements, image, id} = data;
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-6xl font-bold text-text_blue">{name}</h2>
            <div className="flex gap-8 flex-wrap" id={id}>
                <div className="w-[200px] h-[355px] flex justify-center items-center">
                    <img className="rounded-2xl w-[100%] object-center object-cover" src={image} alt="photo"/>
                </div>
                <div className="flex flex-col gap-5 min-w-[300px]">
                    <h1 className="uppercase h1-bold border-b-2 border-b-black">Роль в команде</h1>
                    <ul>
                        {
                            rolesInTeam && (
                                rolesInTeam.map((edu: string, index: number) => (
                                    <li className="text-2xl font-bold" key={index}>{edu.toUpperCase()}</li>))
                            )
                        }
                    </ul>
                    <h1 className="uppercase h1-bold border-b-2 border-b-black">Биография</h1>
                    <pre className="font-sans whitespace-pre-wrap">
                            {
                                description
                            }
                        </pre>
                </div>
                <div className="flex flex-col gap-5 min-w-[300px]">
                    <h1 className="uppercase h1-bold border-b-2 border-b-black">Образование</h1>
                    <div className="flex flex-row">
                        {
                            education && (
                                education.map((edu: string, index: number) => (
                                    <h4 className="text-2xl font-bold" key={index}>{edu}</h4>))
                            )
                        }
                    </div>
                    <h1 className="uppercase h1-bold border-b-2 border-b-black">Достижения</h1>
                    <ul>
                        {
                            achievements && (
                                achievements.map((edu: string, index: number) => (
                                    <li className="text-2xl font-bold pl-2" key={index}>{edu}</li>))
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Person;