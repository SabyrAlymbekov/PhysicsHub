import React from "react";
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";
import { DateRange } from "react-day-picker";
import { isWithinInterval, isAfter } from "date-fns";

interface Olympiad {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    registrationStart: Date;
    registrationEnd: Date;
}

interface RenderOlympiadsProps {
    olympiads: Olympiad[];
    dateRange?: DateRange;
    showUpcoming: boolean;
}

const RenderOlympiads: React.FC<RenderOlympiadsProps> = ({ olympiads, dateRange, showUpcoming }) => {
    const now = new Date();

    const filteredOlympiads = olympiads.filter((olympiad) => {
        const { registrationStart, registrationEnd } = olympiad;
        const registrationEndDate = new Date(registrationEnd);
        const isValidDate = !isNaN(registrationEndDate.getTime());

        if (isValidDate && showUpcoming && isAfter(now, registrationEndDate)) {
            return false;
        }

        if (dateRange?.from && dateRange?.to) {
            const isStartWithinRange = isWithinInterval(registrationStart, {
                start: dateRange.from,
                end: dateRange.to,
            });
            const isEndWithinRange = isWithinInterval(registrationEnd, {
                start: dateRange.from,
                end: dateRange.to,
            });

            return isStartWithinRange && isEndWithinRange;
        }

        return true;
    });

    return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mb-20">
          {filteredOlympiads.map((olympiad) => (
            <OlympiadBlock olympiad={olympiad} key={olympiad.id} />
          ))}
      </div>
    );
};

export default RenderOlympiads;