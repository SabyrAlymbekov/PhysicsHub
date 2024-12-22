import Main from "@/components/home/Main";
import Goals from "@/components/home/goals/Goals";
import TeamSection from "@/components/home/team";
import WeInNums from "@/components/home/weinnums/page";
import { getTeamMembers } from "@/lib/actions/team/getTeam";

export default async function Home() {
  const teamMembers = await getTeamMembers("TEAM");
  const admins = await getTeamMembers("ADMIN");

  return (
    <div className="flex flex-col">
        <Main></Main>
        <Goals></Goals>
        <WeInNums></WeInNums>
        <TeamSection teamMembers={teamMembers} admins={admins}></TeamSection>
    </div>
  );
}
