import { Button } from '../ui/button';
import getTextbookTopics from '@/lib/actions/textbooks/getTextbookTopics';
import TopicButton from './TopicButton';

async function TopicsFilterComponent({selectedTopics}: {selectedTopics: string[]}) {
  const topicsList = await getTextbookTopics();
  
  return (
    <div className='py-6 px-4 flex flex-col w-full lg:w-[400px] border rounded-md h-fit gap-3'>
      <h1 className="font-semibold text-2xl">выберите теги: </h1>
      <div className='flex flex-wrap h-fit gap-2'>
        {topicsList.map((topic) => {
          if (!selectedTopics.includes(topic.id)) {
            return <TopicButton topic={topic} key={topic.id}></TopicButton>
          } else {
            return <Button
            key={topic.id}
            variant={"default"}
            className='rounded-full'
            size="sm"
                  >
            {topic.name + ' ' + topic.bookCount}
          </Button>
          }
        })}
      </div>
    </div>
  );
}

export const TopicsFilter = TopicsFilterComponent;