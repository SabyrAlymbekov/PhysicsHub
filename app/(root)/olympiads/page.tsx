import React, { Suspense } from 'react'
import OlympiadsTitle from "@/components/shared/olympiads/title";
import RenderOlympiads from "@/components/shared/olympiads/RenderOlympiads";
import OlymiadsFilters from '@/components/shared/olympiads/OlymiadsFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { currentUser } from '@/lib/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Olympiads = async (props: {
    searchParams?: Promise<{
      from?: string,
      to?: string,
      country? :string
    }>;
  }) => {
    const searchParams = await props.searchParams;
    const dateRange = {
        from: ((searchParams && searchParams.from) ? new Date(searchParams.from) : undefined),
        to: ((searchParams && searchParams.to) ? new Date(searchParams.to) : undefined)
    }
    const user = await currentUser();
    return (
        <div className="flex flex-col">
            <OlympiadsTitle></OlympiadsTitle>
            {user?.role == "ADMIN" && <Link href="/admin/olympiads" className='container mt-9'><Button>Create an olympiad</Button></Link>}
            <section className="container flex flex-col gap-10 mt-20">
                <Suspense fallback={<Skeleton className='w-full h-[36px]'></Skeleton>}>
                    <OlymiadsFilters></OlymiadsFilters>
                </Suspense>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <RenderOlympiads dateRange={dateRange} region={searchParams?.country || undefined}/>
                </Suspense>
            </section>
        </div>
    )
}

export default Olympiads;