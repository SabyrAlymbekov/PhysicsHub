import React, { Suspense } from "react"
import {currentUser} from "@/lib/actions/authActions";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import MaterialsList from "@/components/resources/materialsList";
import { MaterialsPagination } from "@/components/resources/materialsPagination";
import { TopicsFilter } from "@/components/resources/topicFilters";
import TopicFiltersSkeleton from "@/components/resources/skeletons/TopicFiltersSkeleton";
import MaterialsListSkeleton from "@/components/resources/skeletons/materialsListSkeleton";
import getTextbooksByTopicsCount from "@/lib/actions/textbooks/getTextbooksByTopicsCount";
import { Skeleton } from "@/components/ui/skeleton";
import TopicChoosed from "@/components/resources/topicChoosed";
import SelectInput from "@/components/resources/selectInput";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Materials",
    description: "Все необходимые и лучшие материалы и ресурсы для подготовки к олимпиадам по физике, а также для самостоятельного изучения физики."
};

const Resources = async (props: {
    searchParams?: Promise<{
      topics?: string;
      page?: string;
      type?: string;
    }>;
  }) => {
    const user = await currentUser();
    const isAdmin = user?.role == "ADMIN";
    const searchParams = await props.searchParams;
    const topics = searchParams?.topics?.split(',') || [];
    const currentPage = Number(searchParams?.page) || 1;
    const curTag = (searchParams?.type == "problembook" ? searchParams?.type : ((searchParams?.type == "textbook") ? "textbook" : "textbook")) || "textbook";
    const pageSize = 8;
    const totalCount = await getTextbooksByTopicsCount(topics, curTag)
    const totalPages = Math.ceil(totalCount / pageSize);

    return <div className="flex flex-col mb-12">
        {isAdmin && <Link href="/admin/resources" className="container mt-8"><Button variant="outline" className="w-fit">Перейти в админ панель</Button></Link>}
        <div className="container my-10 flex flex-col gap-6 lg:flex-row-reverse">
            <Suspense fallback={<TopicFiltersSkeleton/>}>
                <TopicsFilter />
            </Suspense>
            <div className="flex flex-col border rounded-md px-4 py-6 w-full lg:w-[calc(100%-400px-1.5rem)] h-fit">
                <Suspense fallback={<Skeleton className="w-[200px] h-[36px] m-auto" />}>
                    <MaterialsPagination
                        totalPages={totalPages}
                    />
                </Suspense>
                <TopicChoosed selectedTopics={topics}></TopicChoosed>
                <Suspense fallback={<Skeleton className="w-[180px] h-[36px]" />}>
                    <SelectInput></SelectInput>
                </Suspense>
                <Suspense fallback={<MaterialsListSkeleton></MaterialsListSkeleton>}>
                    <MaterialsList selectedTopicIds={topics} currentPage={currentPage} pageSize={pageSize} tag={curTag}/>
                </Suspense>
            </div>
        </div>
    </div>
}

export default Resources;