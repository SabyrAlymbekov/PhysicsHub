"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { countries } from "@/constants/countries";

import { Country } from "@/types/countries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CountryDropdownProps {
  disabled?: boolean;
  onSelect: (country: Country | undefined) => void;
  curCountry?: Country | undefined;
}

const CountryDropdown = ({ disabled, onSelect, curCountry }: CountryDropdownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[300px] justify-between"
          disabled={disabled}
        >
          <span>
            {
              <div className="flex items-end gap-2">
                <span>
                  {
                    curCountry ? curCountry.emoji : "🌍"
                  }
                </span>
                <span>
                  {
                    curCountry ? curCountry.name : "Выберите страну"
                  }
                </span>
              </div>
            }
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-[6px] p-0">
        <Command>
        <CommandList>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>Страна не найдена</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[300px] w-full">
              {countries.map((country: Country) => {
                return (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      if (curCountry !== undefined) {
                        onSelect((country.name == curCountry.name) ? undefined : country);
                      } else {
                        onSelect(country);
                      }
                    }}
                    className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                  >
                    <div className="flex items-end gap-2">
                      <span>{country.emoji}</span>
                      <span className="">{country.name}</span>
                    </div>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (curCountry !== undefined && curCountry.name.toLowerCase() === country.name.toLowerCase())
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;
