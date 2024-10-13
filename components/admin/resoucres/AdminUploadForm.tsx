"use client"

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase';
import {currentUser} from "@/lib/actions/authActions";
import {User} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface FormData {
    name: string;
    description: string;
    authors: string;
    tags: string;
    topics: string;
    file: File | null;
}

export default function AdminUploadForm() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const w = async () => {
            const curUser = await currentUser();
            setUser(curUser);
        }
        w()
    }, [])
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        authors: '',
        tags: '',
        topics: '',
        file: null,
    });
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'file' && e.target instanceof HTMLInputElement && e.target.files) {
            setFormData({ ...formData, file: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.file) {
            alert('Пожалуйста, выберите файл для загрузки.');
            return;
        }

        const fileName = `${Date.now()}_${formData.file.name}`;
        const storageRef = ref(storage, `textbooks/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Ошибка загрузки файла:', error);
            },
            async () => {
                const filePath = `textbooks/${fileName}`;

                const authorsArray = formData.authors.split(',').map((item) => item.trim());
                const tagsArray = formData.tags.split(',').map((item) => item.trim().toLowerCase());
                const topicsArray = formData.topics.split(',').map((item) => item.trim().toLowerCase());
                const response = await fetch('/api/textbooks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        description: formData.description,
                        authors: authorsArray,
                        tags: tagsArray,
                        topics: topicsArray,
                        filePath,
                    }),
                });
                if (response.ok) {
                    alert('Учебник успешно добавлен!');
                    setFormData({
                        name: '',
                        description: '',
                        authors: '',
                        tags: '',
                        topics: '',
                        file: null,
                    });
                    setUploadProgress(0);
                } else {
                    const errorData = await response.json();
                    alert(`Ошибка: ${errorData.error}`);
                }
            }
        );
    };

    if (!user|| user.role !== 'ADMIN') {
        return <p>Доступ запрещен</p>;
    }

    return (
        <div className="container my-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[500px]">
                <h2 className="font-bold text-4xl mb-2">Добавить новый учебник</h2>
                <Input
                    type="text"
                    name="name"
                    placeholder="Название"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Textarea
                    name="description"
                    placeholder="Описание"
                    value={formData.description}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="authors"
                    placeholder="Авторы (через запятую)"
                    value={formData.authors}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="tags"
                    placeholder="Теги (через запятую)"
                    value={formData.tags}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="topics"
                    placeholder="Темы (через запятую)"
                    value={formData.topics}
                    onChange={handleChange}
                />
                <Input type="file" name="file" onChange={handleChange} required/>
                <Button type="submit">Загрузить</Button>
                {uploadProgress > 0 && <p>Прогресс загрузки: {uploadProgress.toFixed(2)}%</p>}
            </form>
        </div>
    );
}
