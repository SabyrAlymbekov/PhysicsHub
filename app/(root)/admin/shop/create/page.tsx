"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createProductAction } from "@/lib/actions/shop/createProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateProductPage = () => {
  const [productType, setProductType] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await createProductAction(formData);
        alert("Product created successfully!");
        form.reset();
        setProductType("");
      } catch (error) {
        console.error("Error creating product:", error);
        alert("Failed to create product. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Textarea
            name="description"
            id="description"
            placeholder="Product Description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium">
            Category
          </label>
          <Select onValueChange={(value) => setProductType(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a product's category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="cup">Cup</SelectItem>
                <SelectItem value="t-shirt">T-Shirt</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" name="type" value={productType} />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sizes" className="block text-sm font-medium">
            Sizes
          </label>
          <Input
            type="text"
            name="sizes"
            id="sizes"
            placeholder="Comma-separated sizes"
          />
        </div>

        <div className="mb-4 flex items-center">
          <Checkbox name="inStock" id="inStock" />
          <label htmlFor="inStock" className="ml-2 text-sm font-medium">
            In Stock
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium">
            Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
