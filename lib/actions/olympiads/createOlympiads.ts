// import { db } from "@/lib/db";
// import { currentUser } from "@/lib/actions/authActions";
// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";
//
// export async function createOlympiad(data) {
//     try {
//         const user = await currentUser();
//
//         if (!user || user.role !== 'ADMIN') {
//             return NextResponse.json({ error: "Доступ запрещен" }, { status: 403 });
//         }
//
//         const formData = await data; // Parse the request body
//
//         const {
//             name, description, registrationStart, registrationEnd, resultsDate,
//             participantCount, socialLinks, registrationFormUrl, stages, organizers,
//             logoUrl, coverUrl, regulationsUrl
//         } = formData;
//
//
//         const olympiad = await db.olympiad.create({
//             data: {
//                 name,
//                 description,
//                 registrationStart: (registrationStart != '') ? new Date(registrationStart as string) : null,
//                 registrationEnd: (registrationEnd != '') ? new Date(registrationEnd as string) : null,
//                 resultsDate: (resultsDate != '') ? new Date(resultsDate as string) : null,
//                 participantCount: parseInt(participantCount),
//                 socialLinks,
//                 registrationFormUrl,
//                 stages: { create: stages.map((stage) => (
//                         {
//                             name: stage.name,
//                             startDate: (stage?.startDate) ? stage?.startDate : null,
//                             endDate: (stage?.endDate && stage?.endDate != '') ? stages.endDa : null,
//                         }
//                     )) },
//                 organizers: {
//                     create: organizers.map(org => ({
//                         name: org.name,
//                         link: org.link,
//                         logoUrl: org.logoUrl,
//                     })),
//                 },
//                 logoUrl,
//                 coverUrl,
//                 regulationsUrl,
//             },
//         });
//
//         // Revalidate the path to update the cache
//         revalidatePath('/olympiads');
//
//         return NextResponse.json({ olympiad }, { status: 201 });
//     } catch (error) {
//         console.error('Ошибка при создании олимпиады:', error);
//         return NextResponse.json({ error: 'Ошибка при создании олимпиады' }, { status: 500 });
//     }
// }
