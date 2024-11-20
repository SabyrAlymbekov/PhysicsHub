import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductListFallback = () => {
  return (
    <div className="flex flex-wrap flex-row max-w-[1170px] m-auto gap-[30px] justify-center">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[270px] h-[250px]"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[28px]"></Skeleton>
          <Skeleton className="w-[100px] h-[28px]"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ProductListFallback;
