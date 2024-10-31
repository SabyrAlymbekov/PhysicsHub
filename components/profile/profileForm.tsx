import { getProfile } from "@/lib/actions/profile/getProfile";
import ImageFallback from "../fallbackImage";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

const ProfileFormShare = async ({ userId }: { userId: string }) => {
  const profile: User | null = await getProfile(userId);
  if (profile === null) {
    return <div>Profile not found</div>;
  }
  console.log(profile.projects.length);
  return (
    <div className="flex flex-col gap-4">
      <ImageFallback
        src={profile.image}
        alt="Profile image"
        width={150}
        height={150}
        fallbackSrc="/assets/icons/avatar.png"
        className="rounded-full"
      />
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-500 lowercase">
            {profile.role != "USER" && profile.role}
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
      <p className="text-lg text-gray-700">{profile.bio}</p>
      <div className="flex flex-row gap-2 w-full flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          {profile.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>projects</CardTitle>
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
          )}
          {profile.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>achievements</CardTitle>
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
          )}
          {profile.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>interests</CardTitle>
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
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          {profile.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>education</CardTitle>
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
          )}
          {/* {profile.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>contacts</CardTitle>
                <Separator className="my-3" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {profile.education.map((edu, index) => {
                    return (
                      <div key={index}>
                        <p className="text-lg font-bold">{edu}</p>
                        <Separator className="my-3" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileFormShare;
