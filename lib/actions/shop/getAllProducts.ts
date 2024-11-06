"use server"

import {db} from "@/lib/db";

export async function getAllProducts() {
  try {
    const res = await db.product.findMany()
    return res;
  } catch (error) {
    throw error;
  }
}