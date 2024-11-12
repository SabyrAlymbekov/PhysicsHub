'use server'

import {db} from "@/lib/db";

const getStageByOlympiadsId = async (id: string) => {
  try {
    const res = await db.stage.findMany({
      where: {
        olympiadId: id
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export default getStageByOlympiadsId