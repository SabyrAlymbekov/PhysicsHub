import Image from "next/image";
import Link from "next/link";

const OlympiadBlock = ({ olympiad }) => {
  console.log(olympiad);

  const linkHref = olympiad.id ? (`/olympiads/${olympiad.id}`) : ("#");
  console.log(linkHref);
  return (
    <Link href={linkHref}>
      <div className="olympiad-block w-full bg-gray-100 h-[200px] rounded-xl overflow-hidden">
        <Image
          className="w-full h-1/2 bg-black object-cover"
          src={olympiad.coverUrl}
          width={100}
          height={100}
          alt="olympiad"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gradient truncate">
            {olympiad.name}
          </h2>
          <p>
            Registration: {new Date(olympiad.registrationStart).toLocaleDateString("de-DE")} — {new Date(olympiad.registrationEnd).toLocaleDateString("de-DE")}
          </p>
          {/*<p className="truncate">*/}
          {/*  {olympiad.description}*/}
          {/*</p>*/}
        </div>
      </div>
    </Link>
  );
};

export default OlympiadBlock;