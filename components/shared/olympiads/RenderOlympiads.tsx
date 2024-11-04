import React from "react";
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";
import { DateRange } from "react-day-picker";
import { isWithinInterval, isAfter } from "date-fns";

interface Olympiad {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

interface RenderOlympiadsProps {
    olympiads: Olympiad[];
    dateRange?: DateRange;
    showUpcoming: boolean;
}

const RenderOlympiads: React.FC<RenderOlympiadsProps> = ({ olympiads, dateRange, showUpcoming }) => {
    const now = new Date();

    // Фильтруем олимпиады по диапазону дат и флагу "Предстоящие"
    const filteredOlympiads = olympiads.filter((olympiad) => {
        const { startDate, endDate } = olympiad;

        // Фильтр для предстоящих олимпиад
        if (showUpcoming && isAfter(now, new Date(endDate))) {
            return false;
        }

        // Фильтр по диапазону дат
        if (dateRange && dateRange.from && dateRange.to) {
            return (
              isWithinInterval(new Date(startDate), { start: dateRange.from, end: dateRange.to }) &&
              isWithinInterval(new Date(endDate), { start: dateRange.from, end: dateRange.to })
            );
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