import React from "react";
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";
import { DateRange } from "react-day-picker";
import { getAllOlympiads } from "@/lib/actions/olympiads/getAllOlympiads";

const RenderOlympiads = async ({ dateRange, region }: {dateRange?: DateRange, region?: string}) => {
  const olympiads = (await getAllOlympiads({ dateRange, region})).sort((a, b) => -(a.priority - b.priority));

  return (
    <div className="flex flex-col gap-7 mb-20">
      {olympiads.map((olympiad) => (
        <OlympiadBlock olympiad={olympiad} key={olympiad.id} />
      ))}
    </div>
  );
};

export default RenderOlympiads;
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
