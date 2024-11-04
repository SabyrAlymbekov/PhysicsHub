"use client"

import React, { useState } from 'react'
import { FormSuccess } from '@/components/shared/auth/form-success'
import { FormError } from '@/components/shared/auth/form-error'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { changeProfile } from '@/lib/actions/profile/changeProfile'
import { uploadFileWithProgress, deleteFile } from "@/lib/utils";

const EditImageForm = ({oldImage} : {oldImage: string | null}) => {
    const [state, setState] = useState<React.ReactNode>("")
    const [logo, setLogo] = useState<string | null>(null);
    const [oldLogo, setOldLogo] = useState<string | null>(oldImage);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setIsUploading(true);
            try {
                if (oldLogo) {
                    await deleteFile(oldLogo);
                }
                const url = await uploadFileWithProgress(file, 'users/avatars', setUploadProgress);
                setOldLogo(logo);
                setLogo(url);
                
                // Применяем изображение сразу после загрузки
                const res = await changeProfile({ image: url });
                if (res.error) {
                    setState(<FormError message={res.error} />);
                } else {
                    setState(<FormSuccess message="Изображение успешно применено" />);
                }
            } catch (error) {
                setState(<FormError message="Ошибка загрузки изображения" />);
            } finally {
                setIsUploading(false);
            }
        } else {
            setState(<FormError message="Загрузите изображение" />);
        }
    };

    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Новое фото профиля</Label>
                <Input id="picture" accept="image/*" onChange={handleFileChange} type="file" required disabled={isUploading} />
            </div>
            {uploadProgress > 0 && <div>Загрузка: {uploadProgress}%</div>}
            {state}
        </div>
    )
}

export default EditImageForm