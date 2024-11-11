"use server";

import { db as prisma } from "@/lib/db"; // Убедитесь, что путь корректен

export async function updateTextbook(
    id: string,
    name: string,
    description: string | null,
    authors: string[],
    category: string,
    topics: string[],
    newFilePath: string | null
) {
    // Проверка обязательных полей
    if (!id || !name || !authors.length || !category || !topics.length) {
        throw new Error("Пожалуйста, заполните все обязательные поля.");
    }

    try {
        // Начинаем транзакцию для обеспечения атомарности операций
        return await prisma.$transaction(async (prisma) => {
            // Получаем текущий учебник
            const currentTextbook = await prisma.textbook.findUnique({
                where: { id },
                select: { topicIds: true, filePath: true },
            });

            if (!currentTextbook) {
                throw new Error("Учебник не найден.");
            }

            const currentTopicIds = currentTextbook.topicIds;

            // Получаем все существующие темы по именам одним запросом
            const existingTopics = await prisma.topic.findMany({
                where: { name: { in: topics } },
                select: { id: true, name: true },
            });

            const existingTopicNames = existingTopics.map((topic) => topic.name);
            const existingTopicIds = existingTopics.map((topic) => topic.id);

            // Определяем новые темы, которые нужно создать
            const newTopicNames = topics.filter((topic) => !existingTopicNames.includes(topic));

            // Создаём новые темы индивидуально
            let createdTopics: { id: string; name: string }[] = [];
            if (newTopicNames.length > 0) {
                createdTopics = await Promise.all(
                    newTopicNames.map(async (name) => {
                        const newTopic = await prisma.topic.create({
                            data: { name, bookCount: 1 },
                        });
                        return { id: newTopic.id, name: newTopic.name };
                    })
                );
            }

            // Собираем все topicIds (существующие и созданные)
            const newTopicIds = [...existingTopicIds, ...createdTopics.map((topic) => topic.id)];

            // Находим удалённые topicIds
            const removedTopicIds = currentTopicIds.filter((id) => !newTopicIds.includes(id));

            // Находим добавленные topicIds
            const addedTopicIds = newTopicIds.filter((id) => !currentTopicIds.includes(id));

            // Уменьшаем bookCount для удалённых тем
            if (removedTopicIds.length > 0) {
                await prisma.topic.updateMany({
                    where: { id: { in: removedTopicIds } },
                    data: { bookCount: { decrement: 1 } },
                });

                // Удаляем темы, у которых bookCount <= 0
                await prisma.topic.deleteMany({
                    where: {
                        id: { in: removedTopicIds },
                        bookCount: { lte: 0 },
                    },
                });
            }

            // Увеличиваем bookCount для добавленных тем (существующих)
            if (addedTopicIds.length > 0) {
                await prisma.topic.updateMany({
                    where: { id: { in: addedTopicIds } },
                    data: { bookCount: { increment: 1 } },
                });
            }

            // Обновляем учебник
            const updatedTextbook = await prisma.textbook.update({
                where: { id },
                data: {
                    name,
                    description,
                    authors,
                    tags: [category],
                    topicIds: newTopicIds,
                    ...(newFilePath && { filePath: newFilePath }), // Обновляем filePath, если был загружен новый файл
                },
            });

            return updatedTextbook;
        });
    } catch (error: any) {
        console.error("Ошибка при обновлении учебника:", error.message);
        throw new Error("Не удалось обновить учебник. Попробуйте снова.");
    }
}
