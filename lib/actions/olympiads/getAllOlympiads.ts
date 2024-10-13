"use server"

import {db} from "@/lib/db";

export async function getAllOlympiads() {
    try {
        const res = await db.olympiad.findMany()
        return res;
    } catch (error) {
        throw error;
    }
}