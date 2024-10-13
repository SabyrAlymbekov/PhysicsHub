"use client";

import {useEffect, useState} from 'react';
import {currentUser} from "@/lib/actions/authActions";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function CreateOlympiadForm() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    useEffect(() => {
        const ch = async () => {
            const curUser = await currentUser()
            if (!curUser || curUser.role !== "ADMIN") setIsAdmin(false);
            else setIsAdmin(true);
        }
        ch()
    }, [])
    if (!isAdmin) {
        router.push('/')
    }
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        registrationStart: '',
        registrationEnd: '',
        resultsDate: '',
        participantCount: 0,
        socialLinks: '',
        registrationFormUrl: '',
        stages: '',
        organizers: '',
    });

    const [logo, setLogo] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [regulations, setRegulations] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setter(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на наличие обязательных файлов
        if (!logo || !cover) {
            alert('Пожалуйста, загрузите логотип и обложку олимпиады.');
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('registrationStart', formData.registrationStart);
        formDataToSubmit.append('registrationEnd', formData.registrationEnd);
        formDataToSubmit.append('resultsDate', formData.resultsDate);
        formDataToSubmit.append('participantCount', formData.participantCount.toString());
        formDataToSubmit.append('socialLinks', formData.socialLinks);
        formDataToSubmit.append('registrationFormUrl', formData.registrationFormUrl);
        formDataToSubmit.append('stages', formData.stages);
        formDataToSubmit.append('organizers', formData.organizers);

        formDataToSubmit.append('logo', logo); // Логотип
        formDataToSubmit.append('cover', cover); // Обложка
        if (regulations) {
            formDataToSubmit.append('regulations', regulations); // Положение (опционально)
        }

        try {
            const res = await fetch('/api/olympiads', {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (res.ok) {
                alert('Олимпиада успешно создана!');
                setFormData({
                    name: '',
                    description: '',
                    registrationStart: '',
                    registrationEnd: '',
                    resultsDate: '',
                    participantCount: 0,
                    socialLinks: '',
                    registrationFormUrl: '',
                    stages: '',
                    organizers: '',
                });
                setLogo(null);
                setCover(null);
                setRegulations(null);
            } else {
                const errorData = await res.json();
                alert(`Ошибка: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Ошибка при создании олимпиады:', error);
            alert('Произошла ошибка при создании олимпиады.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px]">
                <Label>
                    Название:
                    <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Описание:
                    <Textarea name="description" value={formData.description} onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Дата начала регистрации:
                    <Input type="date" name="registrationStart" value={formData.registrationStart}
                           onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Дата окончания регистрации:
                    <Input type="date" name="registrationEnd" value={formData.registrationEnd}
                           onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Дата публикации результатов:
                    <Input type="date" name="resultsDate" value={formData.resultsDate} onChange={handleInputChange}
                           required/>
                </Label>

                <Label>
                    Количество участников:
                    <Input type="number" name="participantCount" value={formData.participantCount}
                           onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Ссылки на соцсети (JSON):
                    <Textarea name="socialLinks" value={formData.socialLinks} onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Ссылка на форму регистрации:
                    <Input type="text" name="registrationFormUrl" value={formData.registrationFormUrl}
                           onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Этапы (JSON):
                    <Textarea name="stages" value={formData.stages} onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Организаторы (JSON):
                    <Textarea name="organizers" value={formData.organizers} onChange={handleInputChange} required/>
                </Label>

                <Label>
                    Логотип:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} required/>
                </Label>

                <Label>
                    Обложка:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCover)} required/>
                </Label>

                <Label>
                    Положение (опционально):
                    <Input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, setRegulations)}/>
                </Label>

                <button type="submit">Создать олимпиаду</button>
            </form>
        </div>
    );
}
