"use server"

import {db} from "@/lib/db";

export async function getOlympiadById(id: string) {
    try {
        const res = await db.olympiad.findUnique({where: {id}});
        return res;
    } catch (error) {
        throw error;
    }
}