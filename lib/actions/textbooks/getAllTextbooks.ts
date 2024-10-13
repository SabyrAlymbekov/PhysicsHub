"use server"

import {db} from "@/lib/db";

export async function getAllTextbooks() {
    try {
        const res = await db.textbook.findMany({
            where: {
                tags: {
                    hasEvery: ['textbook'],
                },
            },
        })
        return res;
    } catch (error) {
        throw error;
    }
}