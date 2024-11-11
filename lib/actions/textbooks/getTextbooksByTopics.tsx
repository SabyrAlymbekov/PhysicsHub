"use server"

import { db as prisma } from "@/lib/db";

async function getTextbooksByTopics(topicIds: string[], page: number, pageSize: number) {
    try {
        const whereCondition = topicIds.length > 0 ? {
            topicIds: {
              hasEvery: topicIds,
            },
          } : {};
          
          const textbooks = await prisma.textbook.findMany({
            where: whereCondition,
            skip: (page - 1) * pageSize,
            take: pageSize,
          });

          // Fetch topics associated with the textbooks
          const allTopicIds = Array.from(new Set(textbooks.flatMap((t) => t.topicIds)));
          const topicsList = await prisma.topic.findMany({
            where: {
              id: { in: allTopicIds },
            },
          });
        
          const topicMap = new Map();
          topicsList.forEach((topic) => {
            topicMap.set(topic.id, topic);
          });
        
          const textbooksWithTopics = textbooks.map((textbook) => ({
            ...textbook,
            topics: textbook.topicIds.map((id) => topicMap.get(id)).filter(Boolean),
          }));
        
          return {
            textbooks: textbooksWithTopics,
          };
    } catch (error) {
        console.log(error);
        return {
            textbooks: [],
            message: "Error occured."
        }
    }
  }

export default getTextbooksByTopics;