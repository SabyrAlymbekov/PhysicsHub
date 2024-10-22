import {db} from '@/lib/db';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/firebase';
import {currentUser} from "@/lib/actions/authActions";
import {revalidatePath} from "next/cache";

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    console.log(await params)
    const { id } = (await params);
    console.log(id)

    const user = await currentUser();

    if (!user || user.role !== 'ADMIN') {
        return Response.json({ error: 'Доступ запрещен' }, { status: 403 });
    }

    try {
        const textbook = await db.textbook.findUnique({
            where: { id },
        });

        if (!textbook) {
            return Response.json({ error: 'Учебник не найден' }, { status: 404 });
        }

        const filePath = textbook.filePath;

        await db.textbook.delete({
            where: { id },
        });

        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        revalidatePath('/resources')
        return Response.json({ message: 'Учебник и файл успешно удалены' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении учебника:', error);
        return Response.json({ error: 'Ошибка при удалении учебника' }, { status: 500 });
    }
}
