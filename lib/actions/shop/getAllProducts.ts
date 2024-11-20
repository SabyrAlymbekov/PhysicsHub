"use server"

import {db} from "@/lib/db";

export async function getAllProductsByCategory(Category: string) {
  try {
    const where = (Category.length > 0) ?  {
      where: {
      type: Category
    }
  } : undefined
    const res = await db.product.findMany(where)
    return res;
  } catch (error) {
    throw error;
  }
}