"use server";

import { db as prisma } from "@/lib/db";

export async function deleteTextbook(id: string) {
  if (!id) {
    throw new Error("ID учебника не предоставлен.");
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const currentTextbook = await prisma.textbook.findUnique({
        where: { id },
        select: { topicIds: true, filePath: true },
      });

      if (!currentTextbook) {
        throw new Error("Учебник не найден.");
      }

      const { topicIds } = currentTextbook;

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

    console.log(`Учебник с ID ${id} успешно удалён.`);
  } catch (error: any) {
    console.error("Ошибка при удалении учебника:", error.message);
    throw new Error("Не удалось удалить учебник. Попробуйте снова.");
  }
}
