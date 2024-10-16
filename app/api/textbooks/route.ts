import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {currentUser} from "@/lib/actions/authActions";
import {revalidatePath} from "next/cache"; // Предполагается, что вы используете singleton для PrismaClient

export async function POST(req: NextRequest) {
    const session = await currentUser();

    // Проверка роли пользователя
    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 });
    }

    try {
        // Получаем данные из тела запроса
        const body = await req.json();
        const { name, description, authors, tags, topics, filePath } = body;

        // Создаем учебник в базе данных
        const textbook = await db.textbook.create({
            data: {
                name,
                description,
                authors,
                tags,
                topics,
                filePath,
            },
        });
        revalidatePath('/resources')
        return NextResponse.json(textbook, { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании учебника:', error);
        return NextResponse.json({ error: 'Ошибка при сохранении учебника' }, { status: 500 });
    }
}