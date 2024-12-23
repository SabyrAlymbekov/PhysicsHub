import React from "react";
import OlympiadPage from "@/components/shared/olympiads/OlympiadPage";
import { getOlympiadById } from "@/lib/actions/olympiads/getOlympiadById";
import getStagesByOlympiadId from "@/lib/actions/olympiads/getStagesByOlympiadId";
import { Olympiad, Stage } from "@prisma/client";
import { notFound } from "next/navigation";
import getOrganizerByOlympiadsId from "@/lib/actions/olympiads/getOrganizerByOlympiadId";
import { currentUser } from "@/lib/actions/authActions";
import DeleteOlympiadButton from "@/components/shared/olympiads/deleteOlympiad";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { db } from "@/lib/db";

export async function generateMetadata({ params }: { params: { olympiadId: string } }): Promise<Metadata> {
  const { olympiadId } = params;
  const olympiad: Olympiad | null = await getOlympiadById(olympiadId);
  const stages: Stage[] | undefined = await getStagesByOlympiadId(olympiadId);
  const organizers = await getOrganizerByOlympiadsId(olympiadId);

  if (!olympiad || !stages) {
    return {
      title: "Олимпиада не найдена",
      description: "Такой олимпиады не существует или она была удалена.",
    };
  }

  const organizersString = organizers?.map((organizer) => organizer.name).join(", ");

  return {
    title: olympiad.name,
    description: olympiad.description + (organizersString ? ` Организаторы: ${organizersString}` : ""),
    openGraph: {
      images: [
        {
          url: olympiad.coverUrl,
          width: 1364,
          height: 196,
          alt: "Olympiad banner",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const olympiads = await db.olympiad.findMany({});
  return olympiads.map((olympiad) => ({
    params: {
      olympiadId: olympiad.id,
    },
  }));
}

const Page = async ({ params }: { params: { olympiadId: string } }) => {
  const { olympiadId } = params;
  const olympiad: Olympiad | null = await getOlympiadById(olympiadId);
  const stages: Stage[] | undefined = await getStagesByOlympiadId(olympiadId);
  if (!stages || !olympiad) {
    notFound();
  }

  const organizers = await getOrganizerByOlympiadsId(olympiadId);
  const user = await currentUser();

  return (
    <div className="flex flex-col">
      <div className="container flex flex-row flex-wrap items-center gap-2">
        {user?.role == "ADMIN" && (
          <DeleteOlympiadButton olympiadId={olympiadId}></DeleteOlympiadButton>
        )}
        {user?.role == "ADMIN" && (
          <Link href={`/olympiads/${olympiadId}/edit`}>
            <Button className="my-5" variant={"default"}>
              Редактировать
            </Button>
          </Link>
        )}
      </div>
      <OlympiadPage
        olympiad={olympiad}
        stages={stages}
        organizers={organizers || []}
      />
    </div>
  );
};

export default Page;
