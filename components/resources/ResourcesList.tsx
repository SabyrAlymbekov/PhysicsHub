"use client"

import React, {useEffect, useState} from "react";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/firebase';
import {Textbook} from '@prisma/client';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Button} from "@/components/ui/button";
import {currentUser} from "@/lib/actions/authActions";
import {useRouter} from "next/navigation";

interface TextbookWithUrl extends Textbook {
    url: string;
}

interface Props {
    textbooks: Textbook[];
    name: string;
}

const RenderBook = ({textbook, isAdmin}: {
    textbook: TextbookWithUrl,
    isAdmin: boolean | undefined,
}) => {
    const router = useRouter();
    const handleDelete = async (id: string) => {
        const confirmation = confirm('Вы уверены, что хотите удалить этот учебник?');
        if (!confirmation) return;

        try {
            const response = await fetch(`/api/textbooks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Ошибка: ${errorData.error}`);
                return;
            }

            alert('Учебник успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении учебника:', error);
            alert('Произошла ошибка при удалении учебника.');
        } finally {
            router.push('/resources');
        }
    };

    return <tr
        className="bg-white border-b hover:bg-gray-50">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                <HoverCard>
                    <HoverCardTrigger href={textbook.url} download className="block w-full">
                        {textbook.name}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-50">
                        <div className="space-x-4">
                            <p className="text-sm">
                                Название:
                                {textbook.description}
                            </p>
                            <p className="text-sm">
                                Авторы:
                                {textbook.authors.join(', ')}
                            </p>
                            <p className="text-sm">
                                Описание:
                                {textbook.description}
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
        </th>
        {
            isAdmin && (
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    <Button onClick={async () => {await handleDelete(textbook.id)}}>delete</Button>
                </th>
            )
        }
    </tr>
}

const ResourcesList = ({textbooks, name }: Props) => {
    const [booksWithUrls, setBooksWithUrls] = useState<TextbookWithUrl[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>();

    useEffect(() => {
        const getUser = async () => {
            const curUser = await currentUser();
            if (!curUser || curUser.role !== "ADMIN") setIsAdmin(false);
            else setIsAdmin(true);
        }
        getUser();
    }, []);

    useEffect(() => {
        const fetchURLs = async () => {
            const books = await Promise.all(
                textbooks.map(async (book) => {
                    try {
                        const fileRef = ref(storage, book.filePath);
                        const url = await getDownloadURL(fileRef);
                        return { ...book, url };
                    } catch (error) {
                        console.error(`Ошибка при получении URL для ${book.name}:`, error);
                        return { ...book, url: '#' };
                    }
                })
            );
            setBooksWithUrls(books);
        };
        fetchURLs();
    }, [textbooks]);

    return <section className="container relative mt-14">
        <h1 className="font-bold text-3xl sm:text-5xl text-center mb-4">{name}</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-gradient rounded-lg">
            <tr>
                <th className='px-6 py-3' scope="col rounded-lg">Название</th>
                {
                    isAdmin && <th className='px-6 py-3' scope="col rounded-lg">Admin tools</th>
                }
            </tr>
            </thead>
            <tbody>
            {booksWithUrls.map((book, index: number) => (
                    <RenderBook textbook={book} key={index} isAdmin={isAdmin}></RenderBook>
                ))}
            </tbody>
        </table>
    </section>
}

export default ResourcesList