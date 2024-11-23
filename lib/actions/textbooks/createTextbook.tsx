"use server";

import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTextbook(
    data: {
        name: string,
        description: string | null,
        authors: string[],
        category: string,
        topics: string[],
        filePath?: string | null,
        storagePath?: string | null, 
        source?: string,
        sourceLabel?: string
    }
) {
    const {
        name,
        description,
        authors,
        category,
        topics,
        filePath,
        storagePath,
        source,
        sourceLabel
    } = data
    
    if (!name || !category) {
        throw new Error("Пожалуйста, заполните имя и тип учебника.");
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
                source,
                sourceLabel
            },
        });

        return newTextbook;
        revalidatePath('/materials')
    } catch (error: any) {
        console.error("Ошибка при создании учебника:", error.message);
        throw new Error("Не удалось создать учебник. Попробуйте снова.");
    }
}