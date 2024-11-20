"use server";

import { db as prisma } from "@/lib/db";

export async function createTextbook(
    name: string,
    description: string | null,
    authors: string[],
    category: string,
    topics: string[],
    filePath?: string | null,
    storagePath?: string | null, 
    source?: string
) {
    if (!name || !authors.length || !category || !topics.length) {
        throw new Error("Пожалуйста, заполните все обязательные поля.");
    }

    try {
        const topicIds = await Promise.all(
            topics.map(async (topicName: string) => {
                const existingTopic = await prisma.topic.findUnique({
                    where: { name: topicName },
                });
                if (existingTopic) {
                    await prisma.topic.update({
                        where: { id: existingTopic.id },
                        data: { bookCount: existingTopic.bookCount + 1 },
                    });
                    return existingTopic.id;
                } else {
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

        const newTextbook = await prisma.textbook.create({
            data: {
                name,
                description,
                authors,
                tags: [category],
                filePath,
                topicIds,
                storagePath,
                source
            },
        });

        return newTextbook;
    } catch (error: any) {
        console.error("Ошибка при создании учебника:", error.message);
        throw new Error("Не удалось создать учебник. Попробуйте снова.");
    }
}