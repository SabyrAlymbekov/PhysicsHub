"use server";

import { db as prisma } from "@/lib/db";

export async function createTextbook(
    name: string,
    description: string | null,
    authors: string[],
    category: string,
    topics: string[],
    filePath: string
) {
    if (!name || !authors.length || !category || !filePath || !topics.length) {
        throw new Error("Пожалуйста, заполните все обязательные поля.");
    }

    try {
        // Найти или создать темы и получить их IDs
        const topicIds = await Promise.all(
            topics.map(async (topicName: string) => {
                const existingTopic = await prisma.topic.findUnique({
                    where: { name: topicName },
                });

                if (existingTopic) {
                    // Увеличить счётчик книг в теме
                    await prisma.topic.update({
                        where: { id: existingTopic.id },
                        data: { bookCount: existingTopic.bookCount + 1 },
                    });
                    return existingTopic.id;
                } else {
                    // Создать новую тему
                    const newTopic = await prisma.topic.create({
                        data: {
                            name: topicName,
                            bookCount: 1,
                        },
                    });
                    return newTopic.id;
                }
            })
        );

        // Создание учебника
        const newTextbook = await prisma.textbook.create({
            data: {
                name,
                description,
                authors,
                tags: [category],
                filePath,
                topicIds,
            },
        });

        return newTextbook;
    } catch (error: any) {
        console.error("Ошибка при создании учебника:", error.message);
        throw new Error("Не удалось создать учебник. Попробуйте снова.");
    }
}