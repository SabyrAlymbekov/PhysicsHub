"use server";
import { db } from "@/lib/db";
import { DateRange } from "react-day-picker";

interface GetOlympiadsParams {
  dateRange?: DateRange;
}

export async function getAllOlympiads({ dateRange }: GetOlympiadsParams) {
  try {
    if (dateRange?.from && dateRange?.to) {
        const olympiads = await db.olympiad.findMany({
            where: {
              OR: [
                {
                    registrationStart: {
                        gte: dateRange.from,
                        lte: dateRange.to
                    }
                }, {
                    registrationEnd: {
                        gte: dateRange.from,
                        lte: dateRange.to
                    }
                }
              ]
            },
          });
          return olympiads;
    } else if (dateRange?.from) {
        const olympiads = await db.olympiad.findMany({
            where: {
              OR: [
                {
                    registrationStart: {
                        gte: dateRange.from,
                    }
                }, {
                    registrationEnd: {
                        gte: dateRange.from,
                    }
                }
              ]
            },
          });
          return olympiads;
    } else if (dateRange?.to) {
        const olympiads = await db.olympiad.findMany({
            where: {
              OR: [
                {
                    registrationStart: {
                        lte: dateRange.to
                    }
                }, {
                    registrationEnd: {
                        lte: dateRange.to
                    }
                }
              ]
            },
          });
          return olympiads;
    } else {
        const olympiads = await db.olympiad.findMany();
        return olympiads;
    }
  } catch (error) {
    throw error;
  }
}
