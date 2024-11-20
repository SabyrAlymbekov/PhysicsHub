"use server";

import { db as prisma } from "@/lib/db";
import { storage } from "@/lib/firebaseAdmin";

export async function deleteProductAction(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const bucket = storage.bucket();
  const deletePromises = product.imagePaths.map(async (path: string) => {
    const fileRef = bucket.file(path);
    await fileRef.delete();
  });
  await Promise.all(deletePromises);

  await prisma.product.delete({
    where: { id: productId },
  });
}
