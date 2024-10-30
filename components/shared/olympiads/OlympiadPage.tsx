import React from 'react';
import {getOlympiadById} from "@/lib/actions/olympiads/getOlympiadById";
import Image from "next/image";
import Link from "next/link";

const OlympiadPage = async ({olympiadId}) => {
  console.log(olympiadId);
  // console.log("иди назуй")

  const olympiad = await getOlympiadById(olympiadId);
  console.log(olympiad);
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
          <span className="font-bold py-2 px-4 bg-gray-100 rounded-xl">
            Участников: <span className="text-gradient">{olympiad.participantCount}</span>
          </span>
        </div>
        <h1 className="text-6xl mt-20 mb-5 font-bold uppercase">
          {olympiad.name}
        </h1>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 flex flex-col gap-5">
            <p className="text-lg w-full break-words">
              {olympiad.description}
            </p>
            {/*<div className="stages flex flex-col gap-4">*/}
            {/*  <h2 className="font-semibold text-3xl">Этапы</h2>*/}
            {/*  <div className="">*/}
            {/*    {*/}
            {/*      olympiad.stages.map(() => (*/}

            {/*      ))*/}
            {/*    }*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="register flex flex-col gap-4">
              <h2 className="font-semibold text-3xl">
                Регистрация
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
            {
              true && (
                <div className="stages">
                  <h2 className="font-semibold text-3xl">Этапы</h2>
                  {
                    olympiad.stages.map(stage => (
                      <div className="stage" key={stage.id}>
                        <h3 className="font-semibold text-2xl text-gradient">{stage.name}</h3>
                        <span
                          className="text-gradient">{new Date(stage.startDate).toLocaleDateString("ru-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}</span> — <span
                        className="text-gradient">{new Date(startDate.endDate.toLocaleDateString("ru-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}</span>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
          <div className="col-span-1">gay</div>
        </div>
      </div>
    </div>
  );
};

export default OlympiadPage;