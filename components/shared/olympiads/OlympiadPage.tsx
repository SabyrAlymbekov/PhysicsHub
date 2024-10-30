import React from 'react';
import {getOlympiadById} from "@/lib/actions/olympiads/getOlympiadById";
import Image from "next/image";
import Link from "next/link";
import { CiLink} from "react-icons/ci";
import { MdOutlineAppRegistration,  MdOutlineDescription } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";
import { Separator } from "@/components/ui/separator"
import { BsCalendar2DateFill } from "react-icons/bs";

import { IoPeopleSharp } from "react-icons/io5";



const OlympiadPage = async ({olympiadId}) => {
  console.log(olympiadId);
  // console.log("иди назуй")

  const olympiad = await getOlympiadById(olympiadId);
  console.log(olympiad);
  let links;
  try {
    links = JSON.parse(olympiad.socialLinks);
  } catch (error) {
    links = olympiad.socialLinks; // если это не JSON, просто оставляем как есть
  }
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
  console.log(links, typeof links, "СУКА БЛЯТЬ ЭТО ЕБАННАЯ Я ЕБАЛ В РОТ");
  return (
    <div className="olympiadPage w-full py-10">
      <div className="container relative">
        <div className="relative w-full h-[200px] bg-black border-2 rounded-lg overflow-hidden">
          <Image
            src={``}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-x-0 top-[150px] flex justify-between items-center px-20">
          <Image
            src={``}
            alt="avatar"
            className="w-24 h-24 bg-gray-200 rounded-full object-cover"
          />
          <div className="flex gap-5">
          <span className="md:hidden font-bold py-2 px-4 bg-gray-100 rounded-xl gap-2 flex flex-nowrap items-center">
            <IoPeopleSharp></IoPeopleSharp>
            {olympiad.participantCount}
          </span>
          <span className="md:block hidden font-bold py-2 px-4 bg-gray-100 rounded-xl">
            Участников: <span className="text-gradient">{olympiad.participantCount}</span>
          </span>
          <span className="md:block hidden font-bold py-2 px-4 bg-gray-100 rounded-xl">
            Было создано {timeSince(olympiad.createdAt)}
          </span>
          <span className="md:hidden gap-2 font-bold py-2 px-4 bg-gray-100 rounded-xl flex flex-nowrap items-center">
            <BsCalendar2DateFill></BsCalendar2DateFill>
            {timeSince(olympiad.createdAt)}
          </span>
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl mt-20 mb-5 font-bold uppercase">
          {olympiad.name}
        </h1>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex flex-col gap-4 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <MdOutlineDescription/>
                <span>
                  Описание
                </span>
              </h2>
              <p className="text-lg break-words">
                {/*{olympiad.description}*/}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, blanditiis, consequuntur dignissimos dolore earum eligendi eum explicabo incidunt iste mollitia nihil nobis provident reiciendis reprehenderit sed, veniam voluptatibus! Commodi nostrum, sed? Blanditiis deleniti dolores inventore minima modi, sint! Accusamus asperiores at deserunt natus non pariatur quibusdam rerum sequi sint tempore.
              </p>
            </div>


            <div className="register flex flex-col gap-4 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <MdOutlineAppRegistration/>
                <span>
                  Регистрация
                </span>
              </h2>
              <div className="flex gap-5 font-medium text-xl">

                <p>
                  Начало: <span
                  className="text-gradient">{new Date(olympiad.registrationStart).toLocaleDateString("ru-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}</span>
                </p>
                <p>
                  Конец: <span
                  className="text-gradient">{new Date(olympiad.registrationStart).toLocaleDateString("ru-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}</span>
                </p>

              </div>
              <Link href={olympiad.regulationsUrl} className="font-medium text-gray-500 hover:text-gray-700">
                Ссылка на заполнение формы
              </Link>
            </div>

            {/*{*/}
            {/*  true && (*/}
            {/*    <div className="stages">*/}
            {/*      <h2 className="font-semibold text-3xl">Этапы</h2>*/}
            {/*      {*/}
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
            <div className="results flex flex-col gap-5 border p-4 rounded-lg">
              <h2 className="font-semibold text-2xl lg:text-3xl flex gap-1 items-center flex-nowrap">
                <IoMdAlarm/>
                <span>
                  Результаты
                </span>
              </h2>
              <p  className="flex gap-2 font-medium text-xl">
                <span>Дата:</span>
                <span
                  className="text-gradient">{new Date(olympiad.resultsDate).toLocaleDateString("ru-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}</span>

              </p>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-2 lg:gap-5">
            <div className="lg:hidden block">
              <Separator></Separator>
            </div>
            <h2 className="font-semibold text-[20px] lg:text-3xl text-gradient">
              Социальные сети:
            </h2>
            <ul>
              <li className="">
              <Link href={links} className="flex flex-nowrap items-center gap-2" target="_blank">
                  <CiLink></CiLink>
                  <span>
                    {links}
                  </span>
                </Link>
              </li>
              {/*{*/}
              {/*  links.map((link, index) => (*/}
              {/*      <li key={index} className="">*/}

              {/*        <Link href={link}>*/}
              {/*          link*/}
              {/*        </Link>*/}
              {/*      </li>*/}
              {/*    )*/}
              {/*  )*/}
              {/*}*/}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlympiadPage;