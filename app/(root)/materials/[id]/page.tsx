import getTextbookById, {
  getTopicsByTextbookid,
} from "@/lib/actions/textbooks/getTextbookById";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const fetchTopics = getTopicsByTextbookid(id);
  const [textbook, topics] = await Promise.all([
    getTextbookById(id),
    fetchTopics,
  ]);
  if (!textbook) {
    return <h1>404</h1>;
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
      {textbook.source && (
        <p className="text-gray-300">
          Источник:{" "}
          {textbook.source.includes("https") ? (
            <a href={textbook.source}>{textbook.source}</a>
          ) : (
            ""
          )}
        </p>
      )}
      <Link download href={textbook.filePath}>
        <Button variant="default" className="my-4">
          Скачать
        </Button>
      </Link>
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
    </div>
  );
};

export default page;
