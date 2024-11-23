"use server";

import { db as prisma } from "@/lib/db";

async function getTextbooksByTopics(
  topicIds: string[] = [],
  tag: string,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const whereCondition = {
      ...(topicIds.length > 0 && {
        topicIds: {
          hasEvery: topicIds,
        },
      }),
      tags: {
        has: tag,
      },
    };

    const materials = await prisma.textbook.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const allTopicIds = Array.from(new Set(materials.flatMap((m) => m.topicIds)));
    const topicsList = await prisma.topic.findMany({
      where: {
        id: { in: allTopicIds },
      },
    });

    const topicMap = new Map();
    topicsList.forEach((topic) => {
      topicMap.set(topic.id, topic);
    });

    const materialsWithTopics = materials.map((material) => ({
      ...material,
      topics: material.topicIds.map((id) => topicMap.get(id)).filter(Boolean),
    }));
    
    return {
      materials: materialsWithTopics,
    };
  } catch (error) {
    console.log(error);
    return {
      materials: [],
      message: "Произошла ошибка.",
    };
  }
}

export default getTextbooksByTopics;