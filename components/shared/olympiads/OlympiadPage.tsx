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

<<<<<<< HEAD
// TODO: Добавить этапы и организаторы
// TODO: убрать было создано
// TODO: убрать все ошибки типов
// TODO: сделать нормальное описание
// TODO: если описание слишком длинное то обрезать его и добавить в конец многоточие и read more, при нажатии на которое будет показываться полное описание
// TODO: сделать красивые карточки олимпиады на главной
// TODO: добавить фильтры

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

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
      return count + " " + getDeclension(count, interval.singular, interval.few, interval.many);
    }
  }
  return seconds + " " + getDeclension(seconds, "секунда", "секунды", "секунд");
}

function getDeclension(number, singular, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) return singular;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

const OlympiadPage = async ({olympiadId}: {olympiadId: string}) => {
  console.log(olympiadId);

  const olympiad = await getOlympiadById(olympiadId);
  if (!olympiad) return <div>Олимпиада не найдена</div>;
  console.log(olympiad);
  let links;
=======
// Типы для олимпиады, этапов и ссылок на социальные сети
interface Olympiad {
  id: string;
  name: string;
  description: string;
  participantCount: number;
  createdAt: string;
  registrationStart: string;
  registrationEnd: string;
  registrationFormUrl?: string;
  socialLinks: string;
  resultsDate: string;
}

interface Stage {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
}

interface SocialLink {
  url: string;
  name?: string;
}

interface OlympiadPageProps {
  olympiadId: string;
}

const OlympiadPage: React.FC<OlympiadPageProps> = async ({ olympiadId }) => {
  const olympiad: Olympiad = await getOlympiadById(olympiadId);
  const stages: Stage[] = await getStagesByOlympiadId(olympiadId);

  let links: SocialLink[] | string;
>>>>>>> 9dff0ec (added typization')
  try {
    links = JSON.parse(olympiad.socialLinks);
  } catch (error) {
    links = olympiad.socialLinks;
  }
<<<<<<< HEAD
  
  console.log(links, typeof links, "СУКА БЛЯТЬ ЭТО ЕБАННАЯ Я ЕБАЛ В РОТ");
=======

  const timeSince = (date: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
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

>>>>>>> 9dff0ec (added typization')
  return (
    <div className="olympiadPage w-full py-10">
      <div className="container relative">
        <div className="relative w-full h-[200px] bg-black border-2 rounded-lg overflow-hidden">
          <Image src={``} alt="banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-x-0 top-[150px] flex justify-between items-center px-20">
          <Image src={``} alt="avatar" className="w-24 h-24 bg-gray-200 rounded-full object-cover" />
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
              <p className="text-lg break-words">{olympiad.description}</p>
            </div>

            <div className="register flex flex-col gap-4 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <MdOutlineAppRegistration />
                <span>Регистрация</span>
              </h2>
              <div className="flex gap-5 font-medium text-xl">
                <p>
<<<<<<< HEAD
                  Начало: <span
                  className="text-gradient">{(olympiad.registrationStart) ? new Date(olympiad.registrationStart).toLocaleDateString("ru-GB", {
=======
                  Начало: <span className="text-gradient">{new Date(olympiad.registrationStart).toLocaleDateString("ru-GB", {
>>>>>>> 9dff0ec (added typization')
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }) : "Пока неизвестно"}</span>
                </p>
                <p>
<<<<<<< HEAD
                  Конец: <span
                  className="text-gradient">{(olympiad.registrationEnd) ? new Date(olympiad.registrationEnd).toLocaleDateString("ru-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }) : "Пока неизвестно"}</span>
=======
                  Конец: <span className="text-gradient">{new Date(olympiad.registrationEnd).toLocaleDateString("ru-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}</span>
>>>>>>> 9dff0ec (added typization')
                </p>
              </div>
<<<<<<< HEAD
              <Link href={olympiad.registrationFormUrl} className="font-medium text-gray-500 hover:text-gray-700">
=======
              <Link href={olympiad.registrationFormUrl || "#"} className="font-medium text-gray-500 hover:text-gray-700">
>>>>>>> 9dff0ec (added typization')
                Ссылка на заполнение формы
              </Link>
            </div>

<<<<<<< HEAD
            {/*{*/}
            {/*  true && (*/}
            {/*    <div className="stages">*/}
            {/*      <h2 className="font-semibold text-3xl">Этапы</h2>*/}
            {/*      {*/}
            {/* у олимпиады нет поля этапы ты должен получать эти этапы через функцию getstagesbyolympaidsid в lib/actions/olympiads/getStagesByOlympiadId и делать это оптимизировано */}
            {/*        olympiad.stages.map(stage => (*/}
            {/*          <div className="stage" key={stage.id}>*/}
            {/*            <h3 className="font-semibold text-2xl text-gradient">{stage.name}</h3>*/}
            {/*            <span*/}
            {/*              className="text-gradient">{new Date(stage.startDate).toLocaleDateString("ru-GB", {*/}
            {/*              day: "numeric",*/}
            {/*              month: "long",*/}
            {/*              year: "numeric"*/}
            {/*            })}</span> — <span*/}
            {/*            className="text-gradient">{new Date(startDate.endDate.toLocaleDateString("ru-GB", {*/}
            {/*            day: "numeric",*/}
            {/*            month: "long",*/}
            {/*            year: "numeric"*/}
            {/*          })}</span>*/}
            {/*          </div>*/}
            {/*        ))*/}
            {/*      }*/}
            {/*    </div>*/}
            {/*  )*/}
            {/*}*/}

            {/*{*/}
            {/*  true && (*/}
            {/*    <div className="organizers">*/}
            {/*      <h2 className="font-semibold text-3xl">Организаторы</h2>*/}
            {/* Тоже самое только ты должен получать организаторов через функцию getorganizersbyolympaidid в lib/actions/olympiads/getOrganizersByOlympiadId и делать это оптимизировано */}
            {/*      {*/}
            {/*        olympiad.stages.map(org => (*/}
            {/*          <div className="org" key={org.id}>*/}
            {/*                      <Link href="org.link">*/}

                                    {/*                  <Image*/}
                                    {/*                    src={org.logoUrl}*/}
                                    {/*                    alt="avatar"*/}
                                    {/*                    className="w-20 h-20 bg-gray-200 rounded-full object-cover"*/}
                                    {/*                  />*/}
                                    {/*            <h3 className="font-semibold text-2xl text-gradient">{org.name}</h3>*/}
                                    {/*
                                  </Link>
          </div>*/}
            {/*        ))*/}
            {/*      }*/}
            {/*    </div>*/}
            {/*  )*/}
            {/*}*/}
=======
            {stages && (
              <div className="stages">
                <h2 className="font-semibold text-3xl">Этапы</h2>
                {stages.map((stage) => (
                  <div className="stage" key={stage.id}>
                    <h3 className="font-semibold text-2xl text-gradient">{stage.name}</h3>
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
            )}
>>>>>>> 9dff0ec (added typization')
            <div className="results flex flex-col gap-5 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <IoMdAlarm />
                <span>Результаты</span>
              </h2>
              <p className="flex gap-2 font-medium text-xl">
                <span>Дата:</span>
<<<<<<< HEAD
                <span
                  className="text-gradient">{(olympiad.resultsDate) ? new Date(olympiad.resultsDate).toLocaleDateString("ru-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }) : "Пока неизвестно"}</span>

=======
                <span className="text-gradient">
                  {new Date(olympiad.resultsDate).toLocaleDateString("ru-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
>>>>>>> 9dff0ec (added typization')
              </p>
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-2 lg:gap-5">
            <div className="lg:hidden block">
              <Separator />
            </div>
            <h2 className="font-semibold text-[20px] lg:text-3xl text-gradient">Социальные сети:</h2>
            {Array.isArray(links) && links.length > 0 ? (
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.url || "#"} className="flex flex-nowrap items-center gap-2" target="_blank">
                      <CiLink />
                      <span>{link.name || link.url}</span>
                    </Link>
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