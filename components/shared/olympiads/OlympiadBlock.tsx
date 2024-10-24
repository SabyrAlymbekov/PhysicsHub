import Image from "next/image"
import Link from "next/link";

const OlympiadBlock = ({olympiad}) => {
  console.log(olympiad)
  return (
    <Link href={`/olympiads/${olympiad.id}`}>
      <div className="olympiad-block w-full bg-gray-100 h-[200px] rounded-xl overflow-hidden">

        <Image
          className="w-full h-1/2 bg-black"
          // src={`https://polaris-adygea.ru/images/programs/nauka/kruzhki_2021-2022/fizika_kruzhok.jpg`}
          alt="olympiad"
          // layout="fill"
          // width=""
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gradient">
            {olympiad.name}
          </h2>
          <p>
            Registration: {new Date(olympiad.registrationStart).toLocaleDateString("de-DE")} — {new Date(olympiad.registrationEnd).toLocaleDateString("de-DE")}
          </p>
          <p className="truncate ...">
            {olympiad.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OlympiadBlock;