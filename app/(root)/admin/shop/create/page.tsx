"use client";

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
} from "@/components/ui/select"

const CreateProductPage = () => {
  return (
    <div className="max-w-lg mx-auto mt-8">
      <form action={createProductAction} method="post" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input type="text" name="name" id="name" placeholder="Product Name" required />
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
            category
          </label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a product's category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>category</SelectLabel>
                <SelectItem value="cup">cup</SelectItem>
                <SelectItem value="t-shirt">t-shirt</SelectItem>
                <SelectItem value="other">other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <Input type="number" name="price" id="price" placeholder="0.00" step="0.01" required />
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

        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
