import { NextRequest, NextResponse } from 'next/server';
import {db} from '@/lib/db';
import { storage } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import {currentUser} from "@/lib/actions/authActions";
import {revalidatePath} from "next/cache";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const user = await currentUser();

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 });
    }

    try {
        const {
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
        } = Object.fromEntries(formData.entries());

        const logo = formData.get('logo') as File;
        const cover = formData.get('cover') as File;
        const regulations = formData.get('regulations') as File | null;

        if (!logo || !cover) {
            return NextResponse.json({ error: 'Логотип и обложка обязательны.' }, { status: 400 });
        }

        // Загрузка файлов в Firebase Storage
        const uploadFile = async (file: File, folder: string): Promise<string> => {
            const fileName = `${uuidv4()}_${file.name}`;
            const filePath = `${folder}/${fileName}`;
            const fileRef = storage.bucket().file(filePath);

            const buffer = await file.arrayBuffer();
            await fileRef.save(Buffer.from(buffer), { contentType: file.type });

            await fileRef.makePublic();
            return fileRef.publicUrl();
        };
        const logoUrl = await uploadFile(logo, 'olympiads/logos');
        const coverUrl = await uploadFile(cover, 'olympiads/covers');
        let regulationsUrl = null;

        if (regulations) {
            regulationsUrl = await uploadFile(regulations, 'olympiads/regulations');
        }

        const stagesArray = JSON.parse(stages as string);
        const organizersArray = JSON.parse(organizers as string);
        const socialLinksArray = JSON.parse(socialLinks as string);

        const olympiad = await db.olympiad.create({
            data: {
                name: name as string,
                description: description as string,
                registrationStart: new Date(registrationStart as string),
                registrationEnd: new Date(registrationEnd as string),
                resultsDate: new Date(resultsDate as string),
                participantCount: parseInt(participantCount as string),
                socialLinks: socialLinksArray,
                registrationFormUrl: registrationFormUrl as string,
                stages: {
                    create: stagesArray,
                },
                organizers: {
                    create: organizersArray.map((org: any) => ({
                        sponsorName: org.sponsorName,
                        sponsorWebsiteUrl: org.sponsorWebsiteUrl,
                        logoUrl: org.logoUrl,
                    })),
                },
                logoUrl,
                coverUrl,
                regulationsUrl,
            },
        });
        revalidatePath('/olympiads');
        return NextResponse.json({ olympiad }, { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании олимпиады:', error);
        return NextResponse.json({ error: 'Ошибка при создании олимпиады' }, { status: 500 });
    }
}