import EditOlympiadPage from "@/components/admin/olympiads/AdminOlympiadsEdit"
import { currentUser } from "@/lib/actions/authActions";
import { notFound } from "next/navigation";

const Page = async (params: { id: string }) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    notFound();
  }

  return (
    <EditOlympiadPage params={params}/>
  )
}

export default Page