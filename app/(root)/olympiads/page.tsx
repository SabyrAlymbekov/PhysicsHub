import React from 'react'
import OlympiadsTitle from "@/components/shared/olympiads/title";
import OlympiadsList from "@/components/shared/olympiads/list";

const Olympiads = () => {
    return (
        <div className="flex flex-col">
            <OlympiadsTitle></OlympiadsTitle>
            <OlympiadsList></OlympiadsList>
        </div>
    )
}

export default Olympiads;