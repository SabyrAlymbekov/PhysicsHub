"use client";

import React, { useState, useEffect } from "react";
import DatePickerWithRange from "@/components/shared/olympiads/RangeDatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllOlympiads } from "@/lib/actions/olympiads/getAllOlympiads";
import RenderOlympiads from "@/components/shared/olympiads/RenderOlympiads";
import { DateRange } from "react-day-picker";

const OlympiadsList: React.FC = () => {
    const [olympiads, setOlympiads] = useState([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [showUpcoming, setShowUpcoming] = useState(false);

    useEffect(() => {
        // Функция для получения данных
        const fetchOlympiads = async () => {
            const data = await getAllOlympiads();
            setOlympiads(data);
        };
        fetchOlympiads();
    }, []);

    return (
      <section className="container flex flex-col gap-10 mt-20">
          <div className="row w-full justify-between">
              <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
              <div className="flex items-center space-x-2">
                  <label
                    htmlFor="upcoming"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                      Предстоящие
                  </label>
                  <Checkbox
                    id="upcoming"
                    checked={showUpcoming}
                    onCheckedChange={(checked) => setShowUpcoming(checked)}
                  />
              </div>
          </div>
          <div className="list">
              <RenderOlympiads olympiads={olympiads} dateRange={dateRange} showUpcoming={showUpcoming} />
          </div>
      </section>
    );
};

export default OlympiadsList;