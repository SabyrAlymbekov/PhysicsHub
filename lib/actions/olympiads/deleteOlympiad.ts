"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/actions/authActions";

interface DeleteOlympiadParams {
  olympiadId: string;
}

export async function deleteOlympiad(params: DeleteOlympiadParams) {
  const { olympiadId } = params;

  try {
    const user = await currentUser();

    if (!user || user.role !== 'ADMIN') {
      return {
        message: "forbidden",
      };
    }

    await db.$transaction(async (tx) => {
      await tx.stage.deleteMany({
        where: { olympiadId },
      });

      await tx.organizer.deleteMany({
        where: { olympiadId },
      });

      await tx.olympiad.delete({
        where: { id: olympiadId },
      });
    });

    return {
      message: "success",
    };
  } catch (error) {
    console.error('Ошибка при удалении олимпиады:', error);
    return {
      error: "error",
    };
  }
}