import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const MaterialsListSkeleton = () => {
    const skeletons = Array.from({ length: 20 }, (_, i) => (
        <Skeleton className="w-full rounded-sm h-[45px]" key={i} />
    ));
    return <div className="flex flex-col gap-3 mt-3">{skeletons}</div>;
}

export default MaterialsListSkeleton