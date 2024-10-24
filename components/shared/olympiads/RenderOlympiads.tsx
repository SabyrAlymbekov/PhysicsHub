import React from 'react'
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";

const RenderOlympiads = ({olympiads}) => {
    console.log(olympiads);
    return <div className="grid gap-5 grid-cols-3">
        {
            olympiads.map((olympiad) => (
              <OlympiadBlock olympiad={olympiad} key={olympiad.id} />
            ))
        }
    </div>
}

export default RenderOlympiads