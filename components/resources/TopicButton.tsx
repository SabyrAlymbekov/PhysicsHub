"use client"

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Topic } from '@prisma/client';
import { Button } from '../ui/button';
import { IoMdClose } from "react-icons/io";

const TopicButton = ({topic}: {
    topic: Topic,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const isActive = searchParams.get('topics')?.split(',').includes(topic.id);

  const handleTopicClick = (id: string) => {
    let topics = searchParams.get('topics')?.split(',') || [];
    if (topics.includes(id)) {
      topics = topics.filter((topic) => topic != id)
    } else {
      topics.push(id)
    }
    const newTopics = topics.join(',');
    const newUrl = new URLSearchParams(searchParams);
    if (topics.length)
      newUrl.set('topics', newTopics);
    else
      newUrl.delete('topics');
    newUrl.set('page', '1');
    replace(`${pathname}?${newUrl.toString()}`);
  }
  if (!isActive) {
    return <Button
    key={topic.id}
    onClick={() => handleTopicClick(topic.id)}
    variant={"outline"}
    className={`rounded-full focus:bg-black focus:text-white`}
  size="sm"
          >
    {topic.name}
  </Button>
  } else {
    return <Button
    key={topic.id}
    onClick={() => handleTopicClick(topic.id)}
    variant={"default"}
    className='rounded-full focus:bg-black focus:text-white'
    size="sm"
          >
    {topic.name}
  </Button>
  }
}

export const TopicButtonClose = ({topic}: {
    topic: Topic,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onTopicClick = (id: string) => {
    let topics = searchParams.get('topics')?.split(',') || [];
    topics = topics.filter(curId => curId != id);
    const newTopics = topics.join(',');
    const newUrl = new URLSearchParams(searchParams);
    if (topics.length)
      newUrl.set('topics', newTopics);
    else
      newUrl.delete('topics');
    newUrl.set('page', '1');
    replace(`${pathname}?${newUrl.toString()}`);
  }

    return <Button
    key={topic.id}
    variant={"outline"}
    className='rounded-full'
    size="sm"
    onClick={()=>onTopicClick(topic.id)}
          >
    {topic.name}
    <IoMdClose></IoMdClose>
  </Button>
}

export default TopicButton;