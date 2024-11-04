"use client";

import {ChangeEvent, useEffect, useState} from 'react';
import {currentUser} from "@/lib/actions/authActions";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {uploadFile} from "@/lib/utils";
import { createOlympiad } from "@/lib/actions/olympiads/createOlympiads";

export interface Stage {
    name: string;
    startDate?: string;
    endDate?: string;
}

export interface Organizer {
    name: string;
    link: string;
    logo: File | null;
}

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

    // Stages var/functions
    const [stages, setStages] = useState<Stage[]>([
        { name: ''},
    ]);

    // Функция для добавления нового этапа
    const addStage = () => {
        setStages([...stages, { name: '' }]);
    };

    // Функция для обновления значений каждого этапа
    const handleStageChange = (index: number, field: keyof Stage, value: string) => {
        const newStages = [...stages];
        newStages[index][field] = value;
        setStages(newStages);
    };

    // Функция для удаления этапа
    const removeStage = (index: number) => {
        const newStages = stages.filter((_, i) => i !== index);
        setStages(newStages);
    };

    // Organizers var/functions
    const [organizers, setOrganizers] = useState<Organizer[]>([]);

    const handleOrgChange = (index: number, field: string, value: string) => {
        const newOrganizers: Organizer[] = [...organizers];
        newOrganizers[index] = {
            ...newOrganizers[index],
            [field]: value
        }
        setOrganizers(newOrganizers);
    }

    const handleOrgFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        // Создаем копию массива организаторов
        const updatedOrganizers = [...organizers];

        // Обновляем нужного организатора, добавляя загруженный файл
        updatedOrganizers[index] = {
            ...updatedOrganizers[index],
            logo: file,
        };

        // Обновляем состояние
        setOrganizers(updatedOrganizers);
    };

    const addOrganizer = () => {
        setOrganizers([...organizers, {name: '', link: '', logo: null}]);
    }

    const removeOrg = (index: number) => {
        const neworganizers = organizers.filter((_, i) => i !== index);
        setOrganizers(neworganizers);
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

        if (!logo || !cover) {
            alert('Пожалуйста, загрузите логотип и обложку.');
            return;
        }

        try {
            const logoUrl = await uploadFile(logo, 'olympiads/logos');
            const coverUrl = await uploadFile(cover, 'olympiads/covers');
            const regulationsUrl = regulations ? await uploadFile(regulations, 'olympiads/regulations') : null;

            const organizerLogos = await Promise.all(
                organizers.map(org => org.logo ? uploadFile(org.logo, 'olympiads/organizers/logos') : null)
            );

            const updatedOrganizers = organizers.map((org, i) => ({
                ...org,
                logoUrl: organizerLogos[i],
            }));

            const payload = {
                ...formData,
                stages,
                organizers: updatedOrganizers,
                logoUrl,
                coverUrl,
                regulationsUrl,
            };

            const res = await createOlympiad(payload);

            if (res?.message == "success") {
                alert('Олимпиада успешно создана!');
                router.push('/olympiads');
            } else {
                alert('Ошибка при создании олимпиады!');
            }
        } catch (error) {
            console.error('Ошибка при создании олимпиады:', error);
            alert('Произошла ошибка при создании олимпиады.');
        }
    };


    return (
        <div className="container my-16">
            <h1 className="title mb-6">Create on olympiad</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px] gap-6">
                <Label className="subtitle !text-left !text-black">
                    Название:
                    <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Описание:
                    <Textarea name="description" value={formData.description} onChange={handleInputChange} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Дата начала регистрации:
                    <Input type="date" name="registrationStart" value={formData.registrationStart}
                           onChange={handleInputChange}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Дата окончания регистрации:
                    <Input type="date" name="registrationEnd" value={formData.registrationEnd}
                           onChange={handleInputChange}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Дата публикации результатов:
                    <Input type="date" name="resultsDate" value={formData.resultsDate} onChange={handleInputChange}
                           />
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Количество участников:
                    <Input type="number" name="participantCount" value={formData.participantCount}
                           onChange={handleInputChange} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Ссылки на соцсети:
                    (в формате название:ссылка без пробелов и запятыми для перечисления. Например instagram:https://instagram.com)
                    <Textarea name="socialLinks" value={formData.socialLinks} onChange={handleInputChange} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Ссылка на форму регистрации:
                    <Input type="text" name="registrationFormUrl" value={formData.registrationFormUrl}
                           onChange={handleInputChange} required/>
                </Label>

                <h1 className="subtitle !text-left !text-black">
                    Этапы:
                    {stages.map((stage, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <Label>
                                Название этапа:
                                <Input
                                    type="text"
                                    value={stage.name}
                                    onChange={(e) => handleStageChange(index, 'name', e.target.value)}
                                    placeholder="Введите название этапа"
                                    required
                                />
                            </Label>

                            <Label>
                                Дата начала:
                                <Input
                                    type="date"
                                    value={stage.startDate || ''}
                                    onChange={(e) => handleStageChange(index, 'startDate', e.target.value)}
                                />
                            </Label>

                            <Label>
                                Дата окончания:
                                <Input
                                    type="date"
                                    value={stage.endDate || ''}
                                    onChange={(e) => handleStageChange(index, 'endDate', e.target.value)}
                                />
                            </Label>

                            <Button type="button" onClick={() => removeStage(index)}>
                                Удалить этап
                            </Button>
                        </div>
                    ))}

                    <Button type="button" onClick={addStage}>
                        Добавить этап
                    </Button>

                </h1>

                <h1 className="subtitle !text-left !text-black">
                    Организаторы:
                    {organizers.map((org, index) => (
                        <div key={index} style={{marginBottom: '20px'}}>
                            <Label>
                                Название:
                                <Input
                                    type="text"
                                    value={org.name}
                                    onChange={(e) => handleOrgChange(index, 'name', e.target.value)}
                                    placeholder="Введите название организатора"
                                    required
                                />
                            </Label>

                            <Label>
                                Ссылка на них:
                                <Input
                                    type="text"
                                    value={org.link}
                                    onChange={(e) => handleOrgChange(index, 'link', e.target.value)}
                                    required
                                />
                            </Label>

                            <Label className="subtitle !text-left !text-black">
                                Логотип:
                                <Input type="file" accept="image/*" onChange={(e) => handleOrgFileChange(index, e)}/>
                            </Label>

                            <Button type="button" onClick={() => removeOrg(index)}>
                                Удалить
                            </Button>
                        </div>
                    ))}

                    <Button type="button" onClick={addOrganizer}>
                        Добавить организатора
                    </Button>

                </h1>

                <Label className="subtitle !text-left !text-black">
                    Логотип:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Обложка:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCover)} required/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Положение (опционально):
                    <Input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, setRegulations)}/>
                </Label>

                <Button type="submit">Создать олимпиаду</Button>
            </form>
        </div>
    );
}
