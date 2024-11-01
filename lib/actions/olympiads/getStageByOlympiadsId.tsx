'use server'

import db from "@/lib/db";

const getStageByOlympiadsId = async (id: string) => {
  try {
    let res = await db.stages.findMany({
      where: eq(stages.olympiadId, id)
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export default getStageByOlympiadsId