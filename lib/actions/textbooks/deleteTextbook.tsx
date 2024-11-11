// lib/actions/textbooks/deleteTextbook.ts

"use server";

import { db as prisma } from "@/lib/db";

/**
 * Функция для полного удаления учебника.
 * @param id - ID учебника для удаления.
 */
export async function deleteTextbook(id: string) {
  // Проверка обязательных полей
  if (!id) {
    throw new Error("ID учебника не предоставлен.");
  }

  try {
    // Начинаем транзакцию для обеспечения атомарности операций
    await prisma.$transaction(async (prisma) => {
      // Получаем текущий учебник
      const currentTextbook = await prisma.textbook.findUnique({
        where: { id },
        select: { topicIds: true, filePath: true },
      });

      if (!currentTextbook) {
        throw new Error("Учебник не найден.");
      }

      const { topicIds } = currentTextbook;

      // Удаляем учебник
      await prisma.textbook.delete({
        where: { id },
      });

      // Управление связанными темами
      if (topicIds && topicIds.length > 0) {
        // Уменьшаем bookCount для каждой темы
        await prisma.topic.updateMany({
          where: { id: { in: topicIds } },
          data: { bookCount: { decrement: 1 } },
        });

        // Удаляем темы, у которых bookCount <= 0
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
