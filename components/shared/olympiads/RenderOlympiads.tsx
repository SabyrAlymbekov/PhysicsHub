import React from "react";
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";
import { DateRange } from "react-day-picker";
import { isWithinInterval, isAfter } from "date-fns";
import { Olympiad } from "@prisma/client";

interface RenderOlympiadsProps {
    olympiads: Olympiad[];
    dateRange?: DateRange;
    showUpcoming: boolean;
}

const RenderOlympiads: React.FC<RenderOlympiadsProps> = ({ olympiads, dateRange, showUpcoming }: RenderOlympiadsProps) => {
    const now = new Date();

    const filteredOlympiads = olympiads.filter((olympiad) => {
        const registrationStart = olympiad.registrationStart ? new Date(olympiad.registrationStart) : null;
        const d = olympiad.registrationEnd ? new Date(olympiad.registrationEnd) : null;

        // Фильтр по диапазону дат
        const isInDateRange = dateRange && olympiads.some(olympiad => {
            const { registrationStart, registrationEnd } = olympiad;
            return registrationStart && registrationEnd && dateRange.from && dateRange.to
                ? isWithinInterval(registrationStart, { start: dateRange.from, end: dateRange.to }) ||
                  isWithinInterval(d as Date, { start: dateRange.from, end: dateRange.to })
                : true;
        });

        const isUpcoming = showUpcoming ? registrationStart && isAfter(registrationStart, now) : true;

        return isInDateRange && isUpcoming;
    });

    return (
      <div className="flex flex-col gap-5 mb-20">
          {filteredOlympiads.map((olympiad) => (
            <OlympiadBlock olympiad={olympiad} key={olympiad.id} />
          ))}
      </div>
    );
};

export default RenderOlympiads;