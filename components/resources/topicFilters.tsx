import getTextbookTopics from '@/lib/actions/textbooks/getTextbookTopics';
import TopicButton from './TopicButton';

async function TopicsFilterComponent() {
  const topicsList = await getTextbookTopics();
  
  return (
    <div className='py-6 px-4 flex flex-col w-full lg:w-[400px] border rounded-md h-fit gap-3'>
      <h1 className="font-semibold text-2xl">выберите теги: </h1>
      <div className='flex flex-wrap h-fit gap-2'>
        {topicsList.map((topic) => {
            return <TopicButton topic={topic} key={topic.id}></TopicButton>
        })}
      </div>
    </div>
  );
}

export const TopicsFilter = TopicsFilterComponent;