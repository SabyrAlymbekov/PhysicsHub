import { getProfile } from "@/lib/actions/profile/getProfile";
import ImageFallback from "../fallbackImage";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { currentUser } from "@/lib/actions/authActions";
import ModalWrapper from "./modalWrapper";
import EditFieldForm from "./edits/EditFieldForm";
import EditManyFields from "./edits/EditManyFields";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { z } from "zod";
import Logout from "../shared/auth/Logout-button";
import EditImageForm from "./edits/EditImageForm";

const ProfileFormShare = async ({ userId }: { userId: string }) => {
  const profile: User | null = await getProfile(userId);
  const user = await currentUser();
  if (profile === null) {
    return <div>Profile not found</div>;
  }
  
  return (
    <div className="flex flex-col gap-4">
      <ImageFallback
        src={profile.image}
        alt="Profile image"
        width={120}
        height={120}
        fallbackSrc="/assets/icons/avatar.png"
        className="rounded-full w-[120px] h-[120px]"
      />
      {
              user?.id === userId && (
                <ModalWrapper name="фото профиля">
                  <EditImageForm oldImage={profile.image}/>
                </ModalWrapper>
              )
      }

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold">{profile.name} 
            {
              user?.id === userId && (
                <ModalWrapper name="имя">
                  <EditFieldForm Name="имя" fieldName="name" initialValue={profile.name ?? ""} />
                </ModalWrapper>
              )
            }
            </h1> 
          <p className="text-gray-500 lowercase">
            {profile.role != "USER" && profile.role}
            {
              (user?.role === "ADMIN" && user?.id != profile.id) && (
                <ModalWrapper name="роль">
                  <EditFieldForm Name="роль" fieldName="role" initialValue={profile.role ?? ""} userId={profile.id}/>
                </ModalWrapper>
              )
            }
          </p>
        </div>

        {profile.roles.length > 0 ? (
          <div className="flex flex-row gap-2 flex-wrap">
            {profile.rolesInTeam.map((role, index) => {
              return (
                <Button className="rounded-md" variant="outline" key={index}>
                  {role}
                </Button>
              );
            })}
          </div>
        ) : (
          ""
        )}

        {profile.rolesInTeam.length > 0 && (
          <div className="flex flex-row gap-2 flex-wrap">
            {profile.rolesInTeam.map((role, index) => {
              return (
                <Button className="rounded-md" variant="outline" key={index}>
                  {role}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-lg text-gray-700">{profile.bio} {
              user?.id === userId && (
                <ModalWrapper name="биография">
                  <EditFieldForm Name="биография" fieldName="bio" initialValue={profile.bio ?? ""} />
                </ModalWrapper>
              )
            }</p>

      <div className="flex flex-row gap-2 w-full flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          {profile.projects.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>проекты {
                  user?.id === userId && (
                    <ModalWrapper name="проекты">
                      <EditManyFields name="проекты" fieldName="projects" initialValue={profile.projects} />
                    </ModalWrapper>
                  )
                }</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {profile.projects.map((project, index) => {
                    return (
                      <div key={index} className="w-full">
                        <p className="text-lg">{project}</p>
                        <Separator className="my-1 w-full" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
              user?.id === userId && (
                <ModalWrapper name="проекты" type="add">
                  <EditManyFields name="проекты" fieldName="projects" initialValue={profile.projects} />
                </ModalWrapper>
              )
          )}
          {profile.achievements.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>достижения {
                  user?.id === userId && (
                    <ModalWrapper name="достижения">
                      <EditManyFields name="достижения" fieldName="achievements" initialValue={profile.achievements} />
                    </ModalWrapper>
                  )
                }</CardTitle>
              </CardHeader>
              <CardContent>
                {
                  <div className="flex flex-row gap-2 flex-wrap">
                    {profile.achievements.map((achievement, index) => {
                      return (
                        <div key={index} className="w-full">
                        <p className="text-lg">{achievement}</p>
                        <Separator className="my-1 w-full" />
                      </div>
                      );
                    })}
                  </div>
                }
              </CardContent>
            </Card>
          ) : (
            user?.id === userId && (
              <ModalWrapper name="достижения" type="add">
                <EditManyFields name="достижения" fieldName="achievements" initialValue={profile.achievements} />
              </ModalWrapper>
            )
        )}
          {profile.interests.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>интересы {
                  user?.id === userId && (
                    <ModalWrapper name="интересы">
                      <EditManyFields name="интересы" fieldName="interests" initialValue={profile.interests} />
                    </ModalWrapper>
                  )
                }</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {profile.interests.map((interest, index) => {
                    return (
                        <div key={index} className="w-full">
                        <p className="text-lg">{interest}</p>
                        <Separator className="my-1 w-full" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            user?.id === userId && (
              <ModalWrapper name="интересы" type="add">
                <EditManyFields name="интересы" fieldName="interests" initialValue={profile.interests} />
              </ModalWrapper>
            )
        
        )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          {profile.education.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>образование {
                  user?.id === userId && (
                    <ModalWrapper name="образование">
                      <EditManyFields name="образование" fieldName="education" initialValue={profile.education} />
                    </ModalWrapper>
                  )
                }</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {profile.education.map((edu, index) => {
                    return (
                        <div key={index} className="w-full">
                        <p className="text-lg">{edu}</p>
                        <Separator className="my-1 w-full" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            user?.id === userId && (
              <ModalWrapper name="образование" type="add">
                <EditManyFields name="образование" fieldName="education" initialValue={profile.education} />
              </ModalWrapper>
            )
        )}
          {profile.socials.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>контакты { user?.id === userId && (
              <ModalWrapper name="контакты" type="edit" isContacts={true}>
                <EditManyFields name="контакты" fieldName="socials" initialValue={profile.socials} />
              </ModalWrapper>
            )}</CardTitle>
                <Separator className="my-3" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {profile.socials.map((soc, index) => {
                    return (
                      <div key={index}>
                          {
                            ((z.string().url()).safeParse(soc).success) ? (
                              <Link href={soc}>{soc}</Link>
                            ) : (
                              <p className="font-normal">{soc}</p>
                            )
                        }
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            user?.id === userId && (
              <ModalWrapper name="контакты" type="add" isContacts={true}>
                <EditManyFields name="контакты" fieldName="socials" initialValue={profile.socials} />
              </ModalWrapper>
            )
        )}
        </div>
      </div>
      {userId == user.id && <Logout classname="my-3 w-fit"></Logout>}
    </div>
  );
};

export default ProfileFormShare;
