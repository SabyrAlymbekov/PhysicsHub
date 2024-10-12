import React from 'react';

const Person = ({photo, name, status, school, description}) => {
    return (
        <div className="flex gap-8">
            <div className="flex-shrink-0 basis-[400px]">
                <img className="rounded-2xl w-[100%] object-center object-cover" src={photo} alt="photo"/>
            </div>
            <div className="flex flex-col justify-center gap-5">
                {
                    status && (
                        <h3 className="text-4xl py-5 font-semibold">{status}</h3>
                    )
                }
                <h2 className="text-6xl font-bold text-text_blue">{name}</h2>
                {
                    school && (
                        <h4 className="text-2xl font-bold">{school}</h4>
                    )
                }
                <pre className="font-sans whitespace-pre-wrap">
                    {
                        description
                    }
                </pre>
            </div>
        </div>
    );
};

export default Person;