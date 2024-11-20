"use server";

import { db } from "@/lib/db";
import { currentUser } from "../authActions";
import { revalidatePath } from "next/cache";

interface Stage {
  id?: string;
  name: string;
  startDate?: string;
  endDate?: string;
}

interface Organizer {
  id?: string;
  name: string;
  link: string;
  logoUrl: string;
  logoStorageUrl?: string;
}

export async function updateOlympiad(formData: any) {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN") {
      throw new Error("forbidden");
    }

    const {
      id,
      name,
      description,
      registrationStart,
      registrationEnd,
      resultsDate,
      participantCount,
      socialLinks,
      registrationFormUrl,
      stages,
      organizers,
      logoUrl,
      coverUrl,
      regulationsUrl,
      logoStorageUrl,
      coverStorageUrl,
      regulationsStorageUrl,
    } = formData;

    // Begin a transaction
    await db.$transaction(async (prisma) => {
      // Update the Olympiad
      await prisma.olympiad.update({
        where: { id },
        data: {
          name,
          description,
          registrationStart: registrationStart ? new Date(registrationStart) : null,
          registrationEnd: registrationEnd ? new Date(registrationEnd) : null,
          resultsDate: resultsDate ? new Date(resultsDate) : null,
          participantCount: parseInt(participantCount),
          socialLinks,
          registrationFormUrl,
          logoUrl,
          coverUrl,
          regulationsUrl,
          logoStorageUrl,
          coverStorageUrl,
          regulationsStorageUrl,
        },
      });

      // Update stages
      // Fetch existing stages
      const existingStages = await prisma.stage.findMany({
        where: { olympiadId: id },
      });

      const existingStageIds = existingStages.map((stage) => stage.id);

      const updatedStageIds = stages
        .filter((stage: Stage) => stage.id)
        .map((stage: Stage) => stage.id);

      const stagesToDelete = existingStageIds.filter(
        (stageId) => !updatedStageIds.includes(stageId)
      );

      // Delete removed stages
      if (stagesToDelete.length > 0) {
        await prisma.stage.deleteMany({
          where: { id: { in: stagesToDelete } },
        });
      }

      // Upsert stages
      for (const stage of stages) {
        if (stage.id) {
          // Update existing stage
          await prisma.stage.update({
            where: { id: stage.id },
            data: {
              name: stage.name,
              startDate: stage.startDate ? new Date(stage.startDate) : null,
              endDate: stage.endDate ? new Date(stage.endDate) : null,
            },
          });
        } else {
          // Create new stage
          await prisma.stage.create({
            data: {
              olympiadId: id,
              name: stage.name,
              startDate: stage.startDate ? new Date(stage.startDate) : null,
              endDate: stage.endDate ? new Date(stage.endDate) : null,
            },
          });
        }
      }

      // Update organizers
      // Fetch existing organizers
      const existingOrganizers = await prisma.organizer.findMany({
        where: { olympiadId: id },
      });

      const existingOrganizerIds = existingOrganizers.map((org) => org.id);

      const updatedOrganizerIds = organizers
        .filter((org: Organizer) => org.id)
        .map((org: Organizer) => org.id);

      const organizersToDelete = existingOrganizerIds.filter(
        (orgId) => !updatedOrganizerIds.includes(orgId)
      );

      // Delete removed organizers
      if (organizersToDelete.length > 0) {
        await prisma.organizer.deleteMany({
          where: { id: { in: organizersToDelete } },
        });
      }

      // Upsert organizers
      for (const org of organizers) {
        if (org.id) {
          // Update existing organizer
          await prisma.organizer.update({
            where: { id: org.id },
            data: {
              name: org.name,
              link: org.link,
              logoUrl: org.logoUrl,
            },
          });
        } else {
          // Create new organizer
          await prisma.organizer.create({
            data: {
              olympiadId: id,
              name: org.name,
              link: org.link,
              logoUrl: org.logoUrl,
            },
          });
        }
      }
    });

    revalidatePath("/olympiads");

    return {
      message: "success",
    };
  } catch (error) {
    console.error("Ошибка при обновлении олимпиады:", error);
    return {
      error: "error",
    };
  }
}
