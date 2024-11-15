"use client"

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const SelectInput = () => {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const handeSelectChange = (value: "textbook" | "problembook") => {
        const url = new URLSearchParams(searchParams);
        url.set("type", value);
        replace(`${pathname}?${url.toString()}`);
    }

    return (
        <Select onValueChange={handeSelectChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={(searchParams.get("type") == "textbook" || !searchParams.get("type")) ? "учебники" : "задачники"} defaultValue={searchParams.get("type") || "textbook"} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="textbook">учебники</SelectItem>
            <SelectItem value="problembook">задачники</SelectItem>
        </SelectContent>
        </Select>
    );
};

export default SelectInput;
