import Main from "@/components/home/Main";
import Goals from "@/components/home/goals/Goals";
import WhyUs from "@/components/home/why_us/whyUs";
import TeamSection from "@/components/home/team";

export default function Home() {
  return (
    <div className="flex flex-col">
        <Main></Main>
        <Goals></Goals>
        <WhyUs></WhyUs>
        <TeamSection></TeamSection>
    </div>
  );
}
