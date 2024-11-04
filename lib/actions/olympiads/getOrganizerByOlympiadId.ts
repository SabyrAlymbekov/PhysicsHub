'use server'

import {db} from "@/lib/db";

const getOrganizerByOlympiadsId = async (id: string) => {
  try {
    const res = await db.organizer.findMany({
      where: {
        olympiadId: id
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export default getOrganizerByOlympiadsId