import { Olympiad } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const OlympiadBlock = ({ olympiad }: {olympiad: Olympiad}) => {
  const linkHref = olympiad.id ? (`/olympiads/${olympiad.id}`) : ("#");

  const registrationStart = olympiad.registrationStart ? new Date(olympiad.registrationStart).toLocaleDateString("de-DE") : "неизвестно";
  const registrationEnd = olympiad.registrationEnd ? new Date(olympiad.registrationEnd).toLocaleDateString("de-DE") : "неизвестно";

  return (
    <Link href={linkHref}>
      <div>
        <Image src={olympiad.logoUrl} width={100} height={100} alt="olympiad logo" className="w-[100px] h-[100px] rounded-full aspect-square float-left mr-3 mb-3"></Image>
        <div>
        <h1 className="font-bold text-2xl">{olympiad.name}</h1>
        <h1 className="font-medium text-lg"> <span className="text-gradient">Регистрация с {registrationStart} по {registrationEnd}</span></h1>
        {
          olympiad.description && <p className="text-sm">{(olympiad.description.length<200 ? olympiad.description : olympiad.description.slice(0, 200) + "...")}</p>
        }
        </div>
      </div>
    </Link>
  );
};

export default OlympiadBlock;