"use server"

import { db } from "@/lib/db"

const getTextbookById = async (id: string) => {
  try {
    const textbook = await db.textbook.findUnique({
        where: {id},
    });
    
    return textbook;
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getTopicsByTextbookid = async (id: string) => {
  try {
    const textbook = await db.textbook.findUnique({
        where: {id},
        select: { topicIds: true },
    });
    if (!textbook) {
      return null;
    }
    const { topicIds } = textbook;
    if (!topicIds || topicIds.length === 0) {
      return []; 
    }
    const topics = await db.topic.findMany({
      where: { id: { in: topicIds } },
    });
    return topics;
  } catch (error) {
    console.log(error);
    return null
  }
}

export default getTextbookById