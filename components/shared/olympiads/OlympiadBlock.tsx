import { Olympiad } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const OlympiadBlock = ({ olympiad }: {olympiad: Olympiad}) => {

  const linkHref = olympiad.id ? (`/olympiads/${olympiad.id}`) : ("#");
  console.log(linkHref);

  const registrationStart = olympiad.registrationStart ? new Date(olympiad.registrationStart).toLocaleDateString("de-DE") : "неизвестно";
  const registrationEnd = olympiad.registrationEnd ? new Date(olympiad.registrationEnd).toLocaleDateString("de-DE") : "неизвестно";

  return (
    <Link href={linkHref}>
      <div className="flex flex-row gap-3">
        <Image src={olympiad.logoUrl} width={100} height={100} alt="olympiad logo" className="w-[100px] h-[100px] rounded-full aspect-auto"></Image>
        <div>
        <h1 className="font-bold text-3xl">{olympiad.name}</h1>
        <h1 className="font-medium text-2xl"> Регистрация с {registrationStart} по {registrationEnd}</h1>
        <p className="">{(olympiad.description.length<200 ? olympiad.description : olympiad.description.slice(0, 200) + "...")}</p>
        </div>
      </div>
    </Link>
  );
};

export default OlympiadBlock;