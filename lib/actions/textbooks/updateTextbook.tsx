"use server";

import { db as prisma } from "@/lib/db";
import { currentUser } from "../authActions";

export async function updateTextbook(
    id: string,
    name: string,
    description: string | null,
    authors: string[],
    category: string,
    topics: string[],
    newFilePath: string | null
) {
    if (!id || !name || !authors.length || !category || !topics.length) {
        throw new Error("Пожалуйста, заполните все обязательные поля.");
    }
    const user = await currentUser();

        if (!user || user.role !== 'ADMIN') {
            throw new Error("forbidden");
        }   
    try {
        return await prisma.$transaction(async (prisma) => {
            const currentTextbook = await prisma.textbook.findUnique({
                where: { id },
                select: { topicIds: true, filePath: true },
            });

            if (!currentTextbook) {
                throw new Error("Учебник не найден.");
            }

            const currentTopicIds = currentTextbook.topicIds;

            const existingTopics = await prisma.topic.findMany({
                where: { name: { in: topics } },
                select: { id: true, name: true },
            });

            const existingTopicNames = existingTopics.map((topic) => topic.name);
            const existingTopicIds = existingTopics.map((topic) => topic.id);

            const newTopicNames = topics.filter((topic) => !existingTopicNames.includes(topic));

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

            const newTopicIds = [...existingTopicIds, ...createdTopics.map((topic) => topic.id)];

            const removedTopicIds = currentTopicIds.filter((id) => !newTopicIds.includes(id));

            const addedTopicIds = newTopicIds.filter((id) => !currentTopicIds.includes(id));

            if (removedTopicIds.length > 0) {
                await prisma.topic.updateMany({
                    where: { id: { in: removedTopicIds } },
                    data: { bookCount: { decrement: 1 } },
                });

                await prisma.topic.deleteMany({
                    where: {
                        id: { in: removedTopicIds },
                        bookCount: { lte: 0 },
                    },
                });
            }

            if (addedTopicIds.length > 0) {
                await prisma.topic.updateMany({
                    where: { id: { in: addedTopicIds } },
                    data: { bookCount: { increment: 1 } },
                });
            }

            const updatedTextbook = await prisma.textbook.update({
                where: { id },
                data: {
                    name,
                    description,
                    authors,
                    tags: [category],
                    topicIds: newTopicIds,
                    ...(newFilePath && { filePath: newFilePath }),
                },
            });

            return updatedTextbook;
        });
    } catch (error: any) {
        console.error("Ошибка при обновлении учебника:", error.message);
        throw new Error("Не удалось обновить учебник. Попробуйте снова.");
    }
}
