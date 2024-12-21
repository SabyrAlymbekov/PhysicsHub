"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { DateRange } from "react-day-picker";

interface GetOlympiadsParams {
  dateRange?: DateRange;
  region?: string;
}

export async function getAllOlympiads({ dateRange, region }: GetOlympiadsParams) {
  try {
    const where: Prisma.OlympiadWhereInput = {
      ...(
        region != undefined && {
        regions: {
          has: region
        }}
      ),
    }
    if (dateRange?.from && dateRange?.to) {
        where['OR'] = [
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
    }
    else if (dateRange?.from) {
        
          where.OR = [
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
    }
    else if (dateRange?.to) {
        const olympiads = await db.olympiad.findMany({
            where: {
              ...(
                region != undefined && {
                regions: {
                  has: region
                }}
              ),
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
    }
    const olympiads = await db.olympiad.findMany({
      where,
    });
    return olympiads;
  } catch (error) {
    throw error;
  }
}
