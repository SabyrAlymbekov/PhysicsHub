"use server";

import { db } from "@/lib/db";

export async function getOlympiadById(id: string) {
  try {
    const olympiad = await db.olympiad.findUnique({
      where: { id },
    });

    if (!olympiad) {
      return null;
    }

    const stages = await db.stage.findMany({
      where: { olympiadId: id },
    });

    const organizers = await db.organizer.findMany({
      where: { olympiadId: id },
    });

    return {
      ...olympiad,
      stages,
      organizers,
    };
  } catch (error) {
    console.error("Error fetching Olympiad:", error);
    throw error;
  }
}
