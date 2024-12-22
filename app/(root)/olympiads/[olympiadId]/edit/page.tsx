import EditOlympiadPage from "@/components/admin/olympiads/AdminOlympiadsEdit";
import { currentUser } from "@/lib/actions/authActions";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { olympiadId: string } }) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    notFound();
  }

  return (
    <EditOlympiadPage params={{ id: params.olympiadId }}/>
  );
}

export default Page;