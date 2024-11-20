"use server";

import { db as prisma } from "@/lib/db";
import { storage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const price = parseFloat(formData.get("price") as string);
  const inStock = formData.get("inStock") === "on";
  const sizes = (formData.get("sizes") as string) || "";
  const images = formData.getAll("images") as File[];

  const imageUrls: string[] = [];
  const imagePaths: string[] = [];
  const bucket = storage.bucket();

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const bytes = await file.arrayBuffer();
    const blob = Buffer.from(bytes);
    const filename = `products/${uuidv4()}-${file.name}`;
    const fileRef = bucket.file(filename);

    await fileRef.save(blob, {
      metadata: { contentType: file.type },
      public: true,
    });

    const downloadURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    imageUrls.push(downloadURL);
    imagePaths.push(filename);
  }

  await prisma.product.create({
    data: {
      name,
      description,
      type,
      price,
      sizes: sizes.split(",").map((s) => s.trim()),
      inStock,
      images: imageUrls,
      imagePaths,
    },
  });

  redirect("/shop");
}
