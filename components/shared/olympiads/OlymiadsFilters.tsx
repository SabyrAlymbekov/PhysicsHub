"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import CountryDropdown from "./CountryList";
import { Country } from "@/types/countries";
import { countries } from "@/constants/countries";

const OlymiadsFilters = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const fromdef =
    searchParams.get("from") != null
      ? new Date(searchParams.get("from") as string)
      : undefined;
  const todef =
    searchParams.get("to") != null
      ? new Date(searchParams.get("to") as string)
      : undefined;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromdef,
    to: todef,
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const fCountry = countries.find(
    (country: Country) =>
      country.iso3.toLowerCase() === searchParams.get("country")?.toLowerCase()
  );
  const curCountry = fCountry ? fCountry : undefined;
  
  const onCountrySelect = (country: Country | undefined) => {
    const newUrl = new URLSearchParams(searchParams);
    if (country === undefined) {
      newUrl.delete("country");
    } else {
      newUrl.set("country", country.iso3);
    }
    push(`${pathname}?${newUrl}`);
  };

  const handleSelect = (value: DateRange | undefined) => {
    setDate(value);
    const newUrl = new URLSearchParams(searchParams);
    if (value?.from) {
      newUrl.set("from", value?.from.toISOString());
    } else {
      newUrl.delete("from");
    }
    if (value?.to) {
      newUrl.set("to", value?.to.toISOString());
    } else {
      newUrl.delete("to");
    }
    push(`${pathname}?${newUrl}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full justify-between flex-wrap gap-5">
        <div className="flex gap-2 flex-wrap flex-row-reverse">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[250px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Выберите даты</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleSelect}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        <CountryDropdown curCountry={curCountry} onSelect={(country)=>{
          onCountrySelect(country);
        }}/>
      </div>
      <div className="flex items-center space-x-2">
        <label
          htmlFor="upcoming"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Предстоящие
        </label>
        <Checkbox
          id="upcoming"
          checked={isChecked}
          onCheckedChange={(checked: boolean) => {
            setIsChecked(checked);
            if (checked) {
              handleSelect({ from: new Date(), to: undefined });
            } else {
              handleSelect({ from: undefined, to: undefined });
            }
          }}
        />
      </div>
    </div>
    {/* <h1>Результаты поиска по </h1> */}
    </div>
  );
};

export default OlymiadsFilters;
