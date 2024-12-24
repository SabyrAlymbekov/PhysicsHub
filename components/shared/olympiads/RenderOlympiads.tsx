import React from "react";
import OlympiadBlock from "@/components/shared/olympiads/OlympiadBlock";
import { DateRange } from "react-day-picker";
import { getAllOlympiads } from "@/lib/actions/olympiads/getAllOlympiads";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteOlympiadButton from "./deleteOlympiad";
import { currentUser } from "@/lib/actions/authActions";

const RenderOlympiads = async ({
  dateRange,
  region,
}: {
  dateRange?: DateRange;
  region?: string;
}) => {
  const olympiads = (await getAllOlympiads({ dateRange, region })).sort(
    (a, b) => -(a.priority - b.priority)
  );
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-7 mb-20">
      {olympiads.map((olympiad) => (
        <div key={olympiad.id}>
          <OlympiadBlock olympiad={olympiad} />
          <div className="container flex flex-row flex-wrap items-center gap-2 mt-3">
            {user?.role == "ADMIN" && (
              <DeleteOlympiadButton
                olympiadId={olympiad.id}
              ></DeleteOlympiadButton>
            )}
            {user?.role == "ADMIN" && (
              <Link href={`/olympiads/${olympiad.id}/edit`}>
                <Button className="my-5" variant={"default"}>
                  Редактировать
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderOlympiads;
