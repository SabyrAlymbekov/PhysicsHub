import React from 'react';
import OlympiadPage from "@/components/shared/olympiads/OlympiadPage";

const Page = ({params} : {
  params: { id: string }
}) => {
  return (
    <div className="flex flex-col">
      {/*Привет*/}

      <OlympiadPage olympiadId={params.id} />
    </div>
  );
};

export default Page;