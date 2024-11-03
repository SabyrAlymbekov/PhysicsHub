'use server'

import db from "@/lib/db";

const getStagesByOlympiadId = async (id) => {
  try {
    console.log("Получаем этапы для олимпиады с id:", id);

    const res = await db.Stage.findMany({
      where: {
        olympiadId: new ObjectId(id) // Убедитесь, что id преобразован в ObjectId
      }
    });

    console.log("Найденные этапы:", res);
    return res;
  } catch (error) {
    console.error("Ошибка при получении этапов:", error);
    return null;
  }
};

export default getStagesByOlympiadId;