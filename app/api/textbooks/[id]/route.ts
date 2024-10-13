import { NextRequest, NextResponse } from 'next/server';
import {db} from '@/lib/db';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/firebase';
import {currentUser} from "@/lib/actions/authActions";
import {revalidatePath} from "next/cache";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const user = await currentUser();

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 });
    }

    try {
        const textbook = await db.textbook.findUnique({
            where: { id },
        });

        if (!textbook) {
            return NextResponse.json({ error: 'Учебник не найден' }, { status: 404 });
        }

        const filePath = textbook.filePath;

        await db.textbook.delete({
            where: { id },
        });

        const fileRef = ref(storage, filePath);

        await deleteObject(fileRef);
        revalidatePath('/resources')
        return NextResponse.json({ message: 'Учебник и файл успешно удалены' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении учебника:', error);
        return NextResponse.json({ error: 'Ошибка при удалении учебника' }, { status: 500 });
    }
}
