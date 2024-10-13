// app/api/olympiads/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {db} from '@/lib/db';
import { storage } from '@/lib/firebaseAdmin';
import {currentUser} from "@/lib/actions/authActions";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Получаем сессию пользователя
    const user = await currentUser();

    // Проверка аутентификации и авторизации
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 });
    }

    try {
        // Извлекаем олимпиаду из базы данных по ID
        const olympiad = await db.olympiad.findUnique({
            where: { id },
            include: { organizers: true },
        });

        if (!olympiad) {
            return NextResponse.json({ error: 'Олимпиада не найдена' }, { status: 404 });
        }

        // Удаляем олимпиады из базы данных
        await db.olympiad.delete({
            where: { id },
        });

        // Удаляем логотип, обложку и положение олимпиады из Firebase Storage
        const filesToDelete = [
            olympiad.logoUrl,
            olympiad.coverUrl,
            olympiad.regulationsUrl,
            ...olympiad.organizers.map(org => org.logoUrl),
        ].filter(Boolean); // Убираем null значения

        await Promise.all(
            filesToDelete.map(async (fileUrl: string) => {
                // Преобразуем публичную ссылку в путь файла
                const bucket = storage.bucket();
                const filePath = decodeURIComponent(new URL(fileUrl).pathname).substring(1); // Удаляем первый '/'
                const file = bucket.file(filePath);
                await file.delete();
            })
        );

        return NextResponse.json({ message: 'Олимпиада и связанные файлы успешно удалены' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении олимпиады:', error);
        return NextResponse.json({ error: 'Ошибка при удалении олимпиады' }, { status: 500 });
    }
}
