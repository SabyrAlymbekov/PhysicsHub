import React from 'react';
import {getOlympiadById} from "@/lib/actions/olympiads/getOlympiadById";

const OlympiadPage = async ({olympiadId}) => {
  console.log(olympiadId);
  // console.log("иди назуй")

  const olympiad = await getOlympiadById(olympiadId);
  console.log(olympiad);
  return (
    <div className="olympiadPage w-full py-10">
      <div className="container">
        <h1 className="text-2xl font-bold">
          {olympiad.name}
        </h1>
      </div>
    </div>
  );
};

export default OlympiadPage;