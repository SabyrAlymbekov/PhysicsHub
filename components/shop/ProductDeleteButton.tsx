"use client";

import React from "react";
import { deleteProductAction } from "@/lib/actions/shop/deleteProduct";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ProductDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProductAction(id);
    router.push("/shop");
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete Product
    </Button>
  );
};

export default ProductDeleteButton;
