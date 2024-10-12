import React from 'react';
import DatePickerWithRange from "@/components/shared/olympiads/RangeDatePicker";
import { Checkbox } from "@/components/ui/checkbox"

const OlympiadsList = () => {
    // let data = [
    //     {
    //         title: "GAPC 2024",
    //         begin: '26.09.2024',
    //         end: '27.09.2024',
    //         classes: '10-11',
    //         where: 'online',
    //         shedule: {
    //             regStart: '26.09.2024',
    //             regEnd: '27.09.2024',
    //         }
    //     }
    // ]
    return <section className="container flex flex-col gap-10 mt-20">
        <div className="row w-full justify-between">
            <DatePickerWithRange></DatePickerWithRange>
            <div className="flex items-center space-x-2">
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Предстоящие
                </label>
                <Checkbox id="terms"/>
            </div>
        </div>
        <div className="list">

        </div>
    </section>
}

export default OlympiadsList