"use server";

import { storage } from "@/lib/firebaseAdmin";
import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTextbook(id: string) {
  if (!id) {
    throw new Error("ID учебника не предоставлен.");
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const currentTextbook = await prisma.textbook.findUnique({
        where: { id },
        select: { topicIds: true, filePath: true, storagePath: true},
      });

      if (!currentTextbook) {
        throw new Error("Учебник не найден.");
      }

      const { topicIds } = currentTextbook;
      const path = currentTextbook.storagePath
      const bucket = storage.bucket();

      if (path) {
        const fileRef = bucket.file(path);
        await fileRef.delete();
      }

      await prisma.textbook.delete({
        where: { id },
      });

      if (topicIds && topicIds.length > 0) {
        await prisma.topic.updateMany({
          where: { id: { in: topicIds } },
          data: { bookCount: { decrement: 1 } },
        });

        await prisma.topic.deleteMany({
          where: {
            id: { in: topicIds },
            bookCount: { lte: 0 },
          },
        });
      }
    });
    revalidatePath('/materials')
  } catch (error: any) {
    console.error("Ошибка при удалении учебника:", error.message);
    throw new Error("Не удалось удалить учебник. Попробуйте снова.");
  }
}
