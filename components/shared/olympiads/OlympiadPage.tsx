// 'use client'

import React from 'react';
import { getOlympiadById } from "@/lib/actions/olympiads/getOlympiadById";
import Image from "next/image";
import Link from "next/link";
import { CiLink } from "react-icons/ci";
import { MdOutlineAppRegistration, MdOutlineDescription } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import getStagesByOlympiadId from "@/lib/actions/olympiads/getStagesByOlympiadId";
import getOrganizerByOlympiadsId from "@/lib/actions/olympiads/getOrganizerByOlympiadId";
import { Olympiad, Stage } from '@prisma/client';
import { redirect } from 'next/navigation';

interface OlympiadPageProps {
  olympiadId: string;
}

const OlympiadPage: React.FC<OlympiadPageProps> = async ({ olympiadId }) => {
  const olympiad: Olympiad | null = await getOlympiadById(olympiadId);
  if (!olympiad) {
    redirect('/')
  }
  const stages: Stage[] | undefined = await getStagesByOlympiadId(olympiadId);
  if (!stages) {
    redirect('/')
  }
  const organizers = await getOrganizerByOlympiadsId(olympiadId);

  const links: string[] = olympiad.socialLinks.split(',');
  // const links = [];

  const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = [
      { seconds: 31536000, singular: "год", few: "года", many: "лет" },
      { seconds: 2592000, singular: "месяц", few: "месяца", many: "месяцев" },
      { seconds: 86400, singular: "день", few: "дня", many: "дней" },
      { seconds: 3600, singular: "час", few: "часа", many: "часов" },
      { seconds: 60, singular: "минута", few: "минуты", many: "минут" }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${getDeclension(count, interval.singular, interval.few, interval.many)}`;
      }
    }
    return `${seconds} ${getDeclension(seconds, "секунда", "секунды", "секунд")}`;
  };

  const getDeclension = (number: number, singular: string, few: string, many: string): string => {
    const mod10 = number % 10;
    const mod100 = number % 100;

    if (mod10 === 1 && mod100 !== 11) return singular;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  };

  return (
    <div className="olympiadPage w-full py-10">
      <div className="container relative">
        <div className="relative w-full h-[200px] bg-black border-2 rounded-lg overflow-hidden">
          <Image src={olympiad.coverUrl} alt="banner" width={1364} height={196} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-x-0 top-[150px] flex justify-between items-center px-20">
          <Image src={olympiad.logoUrl} alt="avatar" width={100} height={100} className="w-24 h-24 bg-gray-200 rounded-full object-cover" />
          <div className="flex gap-5">
            <span className="md:hidden font-bold py-2 px-4 bg-gray-100 rounded-xl gap-2 flex flex-nowrap items-center">
              <IoPeopleSharp />
              {olympiad.participantCount}
            </span>
            <span className="md:block hidden font-bold py-2 px-4 bg-gray-100 rounded-xl">
              Участников: <span className="text-gradient">{olympiad.participantCount}</span>
            </span>
            <span className="md:block hidden font-bold py-2 px-4 bg-gray-100 rounded-xl">
              Было создано {timeSince(olympiad.createdAt)}
            </span>
            <span className="md:hidden gap-2 font-bold py-2 px-4 bg-gray-100 rounded-xl flex flex-nowrap items-center">
              <BsCalendar2DateFill />
              {timeSince(olympiad.createdAt)}
            </span>
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl mt-20 mb-5 font-bold uppercase">{olympiad.name}</h1>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex flex-col gap-4 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <MdOutlineDescription />
                <span>Описание</span>
              </h2>
              <p className="text-lg whitespace-pre-wrap">{olympiad.description}</p>
            </div>

            <div className="register flex flex-col gap-4 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <MdOutlineAppRegistration />
                <span>Регистрация</span>
              </h2>
              <div className="flex gap-5 font-medium text-xl">
                <p>
                  Начало: <span className="text-gradient">
                    {
                    (olympiad.registrationStart ? new Date(olympiad.registrationStart).toLocaleDateString("ru-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : "не определено")
                }
                </span>
                </p>
                <p>
                  Конец: <span className="text-gradient">{
                    (olympiad.registrationEnd ? new Date(olympiad.registrationEnd).toLocaleDateString("ru-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : "не определено")
                }</span>
                </p>
              </div>
              <Link href={olympiad.registrationFormUrl || "#"} className="font-medium text-gray-500 hover:text-gray-700">
                Ссылка на заполнение формы
              </Link>
            </div>

            <div className="results flex flex-col gap-5 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <IoMdAlarm />
                <span>Результаты</span>
              </h2>
              <p className="flex gap-2 font-medium text-xl">
                <span>Дата:</span>
                <span className="text-gradient">{
                    (olympiad.resultsDate ? new Date(olympiad.resultsDate).toLocaleDateString("ru-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : "не определено")
                }</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-5">
            {stages && (
              <div className="stages">
                <h2 className="font-semibold text-3xl mb-2 text-gradient">Этапы:</h2>
                <div className="flex flex-col gap-2">

                  {stages.map((stage) => (
                    <div className="stage border rounded-lg p-5" key={stage.id}>
                      <h3 className="font-semibold text-2xl">{stage.name}</h3>
                      <span className="text-gradient">
                      {stage.startDate ? new Date(stage.startDate).toLocaleDateString("ru-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }) : 'Дата не указана'}
                    </span>{" "}
                      —{" "}
                      <span className="text-gradient">
                      {stage.endDate ? new Date(stage.endDate).toLocaleDateString("ru-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }) : 'Дата не указана'}
                    </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {organizers && (
              <div className="organizers">
                <h2 className="font-semibold text-3xl mb-2 text-gradient">Организаторы:</h2>
                <div className="flex justify-center gap-2">

                  {organizers.map((org) => (
                    <div className="organizer flex flex-col items-center w-[70px] " key={org.id}>
                      <a href={org.link || "#"}>
                        <div className="w-[70px] h-[70px]">
                          <Image
                            src={org.logoUrl}
                            width={70}
                            height={70}
                            alt={`${org.name} logo`}
                            className="object-cover rounded-full"
                          />
                        </div>
                      
                      <h3 className="font-semibold text-xl mt-2">{org.name}</h3>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="lg:hidden block">
              <Separator />
            </div>

            <h2 className="font-semibold text-3xl text-gradient">Источники:</h2>
            {links.length > 0 ? (
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={(link.split(':')[1] + ':' + link.split(':')[2]) || "#"} className="flex flex-nowrap items-center gap-2" target="_blank" >
                      <CiLink />
                      <span>{link.split(':')[0]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Социальные сети не указаны</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlympiadPage;