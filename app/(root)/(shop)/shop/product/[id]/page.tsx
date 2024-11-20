"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/lib/actions/shop/deleteProduct";

const ProductPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProductAction(id as string);
    router.push("/shop");
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleDelete}>
        Delete Product
      </Button>
    </div>
  );
};

export default ProductPage;
