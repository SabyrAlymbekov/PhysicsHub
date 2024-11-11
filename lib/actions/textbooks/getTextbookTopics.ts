"use server"

import { db } from "@/lib/db";

const getTextbookTopics = async () => {
    try {
        const data = await db.topic.findMany();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
}

export default getTextbookTopics