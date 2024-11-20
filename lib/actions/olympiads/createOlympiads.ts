"use server"

import { db } from "@/lib/db";
import { currentUser } from "@/lib/actions/authActions";
import { revalidatePath } from "next/cache";
import { Stage } from "@/components/admin/olympiads/AdminOlympiadsForm";

interface Org {
    name: string
    link: string
    logoUrl: string
}

export async function createOlympiad(formData: any) {
    try {
        const user = await currentUser();

        if (!user || user.role !== 'ADMIN') {
            return {
                message: "forbidden"
            }
        }

        const {
            name, description, registrationStart, registrationEnd, resultsDate,
            participantCount, socialLinks, registrationFormUrl, stages, organizers,
            logoUrl, coverUrl, regulationsUrl, logoStorageUrl, coverStorageUrl, regulationsStorageUrl
        } = formData;

        const data = {
            data: {
                name,
                description,
                registrationStart: registrationStart ? new Date(registrationStart) : null,
                registrationEnd: registrationEnd ? new Date(registrationEnd) : null,
                resultsDate: resultsDate ? new Date(resultsDate) : null,
                participantCount: parseInt(participantCount),
                socialLinks,
                registrationFormUrl,
                stages: { create: stages.map((stage: Stage) => ({
                    name: stage.name,
                    startDate: stage.startDate ? new Date(stage.startDate).toISOString() : null,
                    endDate: stage.endDate ? new Date(stage.endDate).toISOString() : null,
                })) },
                organizers: {
                    create: organizers.map((org: Org) => ({
                        name: org.name,
                        link: org.link,
                        logoUrl: org.logoUrl[0],
                    })),
                },
                logoUrl,
                coverUrl,
                regulationsUrl,
                logoStorageUrl,
                coverStorageUrl,
                regulationsStorageUrl
            },
        }

        console.log(data)
        
        await db.olympiad.create(data);

        revalidatePath('/olympiads');

        return {
            message: "success"
        }
    } catch (error) {
        console.error('Ошибка при создании олимпиады:', error);
        return {
            error: "error"
        }
    }
}