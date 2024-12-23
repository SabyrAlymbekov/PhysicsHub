import { SignInButton } from "@/components/shared/auth/signin-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileButton = () => {
  const {data: session} = useSession();
  if (!session) {
    return (
      <SignInButton>
        <Button variant="outline" className="max-xs:hidden">
          Войти
        </Button>
      </SignInButton>
    );
  }

  const user = session.user;

  return (
    <Link href={"/profile/" + user.id} className="max-xs:hidden">
      <Image
        src={(user.image as string) || "/assets/icons/avatar.png"}
        alt="avatar"
        width={36}
        height={36}
        className="rounded-full  w-[36px] h-[36px]"
      ></Image>
    </Link>
  );
};

export default ProfileButton;
