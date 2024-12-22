import getTextbookById, {
  getTopicsByTextbookid,
} from "@/lib/actions/textbooks/getTextbookById";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const material = await getTextbookById(params.id)
  
  if (!material) {
    return {
      title: "Материал не найден",
      description: "Такого материала не существует или он был удален.",
    };
  }

  return {
    title: material.name,
    description: material.description,
  };
}

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const fetchTopics = getTopicsByTextbookid(id);
  const [textbook, topics] = await Promise.all([
    getTextbookById(id),
    fetchTopics,
  ]);

  if (!textbook) {
    notFound();
  }

  return (
    <div className="container my-10">
      <h1 className="text-4xl font-bold">{textbook.name}</h1>
      <p className="text-xl pt-2 pb-6">{textbook.description}</p>
      <div className="flex flex-row gap-2 flex-wrap">
        {topics &&
          topics.map((topic, index) => (
            <Link key={index} href={`/materials?topics=${topic.id}`}>
              <Button variant="outline">{topic.name}</Button>
            </Link>
          ))}
      </div>
      {textbook.filePath && (
        <Suspense fallback={<Skeleton className="w-full h-[800px]"></Skeleton>}>
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            height={600}
            width={800}
            className="w-full h-600 rounded-md"
            src={textbook.filePath}
          ></iframe>
        </Suspense>
      )}
      {textbook.source && (
        <p className="mt-2">
          {textbook.sourceLabel ? textbook.sourceLabel : "Источник"}:{" "}
          {textbook.source.includes("http") ? (
            textbook.source.includes("pdf") ? (
              <a download href={textbook.source}>
                <Button variant="default" className="my-2">
                  Скачать
                </Button>
              </a>
            ) : (
              <a href={textbook.source}>{textbook.source}</a>
            )
          ) : (
            textbook.source
          )}
        </p>
      )}
    </div>
  );
};

export default page;
