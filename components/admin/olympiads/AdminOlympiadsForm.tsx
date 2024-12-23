"use client";

import {ChangeEvent, useEffect, useState} from 'react';
import {currentUser} from "@/lib/actions/authActions";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import { uploadFile} from "@/lib/utils";
import { createOlympiad } from "@/lib/actions/olympiads/createOlympiads";
import { IoCloseSharp } from 'react-icons/io5';
import CountryDropdown from '@/components/shared/olympiads/CountryList';
import { Country } from '@/types/countries';

export interface Stage {
    name: string;
    Date?: string;
    startTime?: string;
    endTime?: string;
    toPracticeLink?: string;
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
            if (!curUser || curUser?.role !== "ADMIN") setIsAdmin(false);
            else setIsAdmin(true);
        }
        ch()
    }, [])

    if (!isAdmin) {
        router.push('/')
    }

    const [stages, setStages] = useState<Stage[]>([
        { name: '' },
    ]);

    const addStage = () => {
        setStages([...stages, { name: '' }]);
    };

    const handleStageChange = (index: number, field: keyof Stage, value: string) => {
        const newStages = [...stages];
        newStages[index][field] = value;
        setStages(newStages);
    };

    const removeStage = (index: number) => {
        const newStages = stages.filter((_, i) => i !== index);
        setStages(newStages);
    };

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

        const updatedOrganizers = [...organizers];

        updatedOrganizers[index] = {
            ...updatedOrganizers[index],
            logo: file,
        };

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
        resultsUrl: '',
        priority: 0,
    });

    const [logo, setLogo] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [regulations, setRegulations] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setter(file);
    };

    const [regions, setRegions] = useState<Country[]>([]);

    const handleCountrySelect = (country: Country | undefined) => {
        if (!country) return;
        if (regions.includes(country)) return;
        setRegions([...regions, country]);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!logo || !cover) {
            alert('Пожалуйста, загрузите логотип и обложку.');
            return;
        }

        setIsSubmitting(true);

        try {
            const logoUrl = await uploadFile(logo, 'olympiads/logos');
            const coverUrl = await uploadFile(cover, 'olympiads/covers');
            const regulationsUrl = regulations ? await uploadFile(regulations, 'olympiads/regulations') : null;

            const organizerLogos = await Promise.all(
                organizers.map(org => org.logo ? uploadFile(org.logo, 'olympiads/organizers/logos') : null)
            );

            const updatedOrganizers = organizers.map((org, i) => {
                const newOrg = {
                    name: org.name,
                    link: org.link,
                    logoUrl: organizerLogos[i],
                }
                return newOrg;
            });

            const payload = {
                ...formData,
                stages,
                organizers: updatedOrganizers,
                logoUrl: logoUrl[0],
                coverUrl: coverUrl[0],
                regulationsUrl: (regulationsUrl ? regulationsUrl[0] : null),
                logoStorageUrl: logoUrl[1],
                coverStorageUrl: coverUrl[1],
                regulationsStorageUrl: (regulationsUrl ? regulationsUrl[1] : null),
                regions: regions.map(region => region.iso3),
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container my-16">
            <h1 className="title mb-6">Create on olympiad</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-[600px] gap-6">
                <Label className="subtitle !text-left !text-black">
                    Название:
                    <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Описание:
                    <Textarea name="description" value={formData.description} onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <div className="subtitle !text-left !text-black">
                    регионы (если олимпиада международная то выберите international и все, иначе выберите регионы в которых она проводится):
                    <div className='border border-input px-3 py-3 flex flex-row gap-2 flex-wrap '>
                        {
                            regions.map((region, index) => (
                                <Button key={index} className='flex gap-1 rounded-full' variant="outline" type={"button"} onClick={() => {
                                    setRegions(regions.filter((r) => r !== region))
                                }}>{region.emoji + ' ' + region.name} <IoCloseSharp></IoCloseSharp></Button>
                            ))
                        }
                    </div>
                    <CountryDropdown onSelect={(country) => {handleCountrySelect(country)}}/>
                </div>

                <Label className="subtitle !text-left !text-black">
                    Дата начала регистрации:
                    <Input type="date" name="registrationStart" value={formData.registrationStart}
                           onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Дата окончания регистрации:
                    <Input type="date" name="registrationEnd" value={formData.registrationEnd}
                           onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Дата публикации результатов:
                    <Input type="date" name="resultsDate" value={formData.resultsDate} onChange={handleInputChange}
                           disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Ссылка на результаты:
                    <Input type="text" name="resultsUrl" value={formData.resultsUrl}
                           onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Количество участников:
                    <Input type="number" name="participantCount" value={formData.participantCount}
                           onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Престижность олимпиады где (0 - самая не престижная и до бесконечности выше)
                    <Input type="number" name="priority" value={formData.priority}
                           onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Ссылки на соцсети:
                    (в формате название:ссылка без пробелов и запятыми для перечисления. Например instagram:https://instagram.com)
                    <Textarea name="socialLinks" value={formData.socialLinks} onChange={handleInputChange} disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Ссылка на форму регистрации:
                    <Input type="text" name="registrationFormUrl" value={formData.registrationFormUrl}
                           onChange={handleInputChange} disabled={isSubmitting}/>
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
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Label>
                                Дата начала:
                                <Input
                                    type="date"
                                    value={stage.Date || ''}
                                    onChange={(e) => handleStageChange(index, 'Date', e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Label>
                                время начала (внимание пишите в формате hh:mm 24 часа иначе на сайте будет некорректно отображатся):
                                <Input
                                    type="text"
                                    value={stage.startTime || ''}
                                    onChange={(e) => handleStageChange(index, 'startTime', e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </Label>
                            <Label>
                                время окончания (внимание пишите в формате hh:mm 24 часа иначе на сайте будет некорректно отображатся):
                                <Input
                                    type="text"
                                    value={stage.endTime || ''}
                                    onChange={(e) => handleStageChange(index, 'endTime', e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Label>
                                Ссылка для решения задач:
                                <Input
                                    type="text"
                                    value={stage.toPracticeLink || ''}
                                    onChange={(e) => handleStageChange(index, 'toPracticeLink', e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Button type="button" onClick={() => removeStage(index)} disabled={isSubmitting}>
                                Удалить этап
                            </Button>
                        </div>
                    ))}

                    <Button type="button" onClick={addStage} disabled={isSubmitting}>
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
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Label>
                                Ссылка на них:
                                <Input
                                    type="text"
                                    value={org.link}
                                    onChange={(e) => handleOrgChange(index, 'link', e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </Label>

                            <Label className="subtitle !text-left !text-black">
                                Логотип:
                                <Input type="file" accept="image/*" onChange={(e) => handleOrgFileChange(index, e)} disabled={isSubmitting}/>
                            </Label>

                            <Button type="button" onClick={() => removeOrg(index)} disabled={isSubmitting}>
                                Удалить
                            </Button>
                        </div>
                    ))}

                    <Button type="button" onClick={addOrganizer} disabled={isSubmitting}>
                        Добавить организатора
                    </Button>

                </h1>

                <Label className="subtitle !text-left !text-black">
                    Логотип:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} required disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Обложка:
                    <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCover)} required disabled={isSubmitting}/>
                </Label>

                <Label className="subtitle !text-left !text-black">
                    Положение (опционально):
                    <Input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, setRegulations)} disabled={isSubmitting}/>
                </Label>

                <Button type="submit" disabled={isSubmitting}>Создать олимпиаду</Button>
            </form>
        </div>
    );
}