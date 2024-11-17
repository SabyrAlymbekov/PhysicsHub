"use server"

import {db} from "@/lib/db";

export async function getProductById(id: string) {
  try {
    const res = await db.product.findUnique({where: {id}});
    return res;
  } catch (error) {
    throw error;
  }
}