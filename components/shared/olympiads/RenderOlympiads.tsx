import React from 'react'
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";

const RenderOlympiads = ({olympiads}) => {
    console.log(olympiads);
    return <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mb-20">
        {
            olympiads.map((olympiad) => (
              <OlympiadBlock olympiad={olympiad} key={olympiad.id} />
            ))
        }
    </div>
}

export default RenderOlympiads