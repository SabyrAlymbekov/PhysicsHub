"use client"

import React, {useEffect, useState} from "react"
import ResourcesTitle from "@/components/resources/ResourcesTitle";
import ResourcesList from "@/components/resources/ResourcesList";
import {getAllTextbooks} from "@/lib/actions/textbooks/getAllTextbooks";
import {currentUser} from "@/lib/actions/authActions";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Textbook} from "@prisma/client";

const Resources = () => {
    const [textbooks, setTextbooks] = useState<Textbook[]>([])
    const [topics, setTopics] = useState<string[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>();
    const [topicsChanges, setTopicsChanges] = useState<string[]>([])

    useEffect(() => {
        const getTextbooksAndTopics = async () => {
            const curUser = await currentUser()
            if (!curUser || curUser.role !== "ADMIN") setIsAdmin(false);
            else setIsAdmin(true);
            const textbooks2 = await getAllTextbooks();
            let topics2 = [];
            for (const i of textbooks2) {
                for (const j of i.topics) {
                    topics2.push(j);
                }
            }
            topics2 = topics2.filter((topic, ind, self) => (ind == self.indexOf(topic)));
            setTextbooks(textbooks2);
            setTopics(topics2)
            setTopicsChanges(topics2)
        }
        getTextbooksAndTopics()
    }, []);

    return <div className="flex flex-col mb-12">
        <ResourcesTitle />
        {isAdmin && <Link href="/admin/resources" className="container mt-8"><Button variant="outline" className="w-fit">Перейти в админ панель</Button></Link>}
        <h1 className="title mt-10 container">Учебники</h1>
        <div className="flex max-width-[500px] flex-wrap flex-row container mt-8 gap-2">
            <Button variant="outline" className={`rounded-full ${(topics === topicsChanges) && 'bg-accent'}`} onClick={()=>{
                setTopics(topicsChanges);
            }}>
                Все
            </Button>
            {
                topicsChanges.map((topic, ind) => (
                    <Button key={ind} variant="outline" className={`rounded-full ${(topics.length == 1 && topics[0] == topic) && 'bg-accent'}`} onClick={()=>{
                        setTopics([topic]);
                    }}>
                        {topic}
                    </Button>
                ))
            }
        </div>
        {
            topics.map((topic, ind) => {
                return <ResourcesList textbooks={textbooks.filter((textbook)=>(textbook.topics.includes(topic)))} name={topic.toUpperCase()} key={ind}></ResourcesList>
            })
        }
    </div>
}

export default Resources;