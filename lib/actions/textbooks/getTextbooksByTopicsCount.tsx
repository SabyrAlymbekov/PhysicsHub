"use server"

import { db as prisma } from "@/lib/db";

const getTextbooksByTopicsCount = async (topicIds: string[], tag: string) => {
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
        
        const totalCount = await prisma.textbook.count({
            where: whereCondition,
        });
    
        return totalCount;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export default getTextbooksByTopicsCount