import getTextbookTopics from "@/lib/actions/textbooks/getTextbookTopics"
import { TopicButtonClose } from "./TopicButton";

const TopicChoosed = async ({selectedTopics}: {selectedTopics: string[]}) => {
    const fetchTopics = await getTextbookTopics();
    const topics = fetchTopics.filter((topic)=>selectedTopics.includes(topic.id));
  return (
    <div className="flex flex-row gap-2 flex-wrap my-2">
        {
            topics.map((topic) => <TopicButtonClose topic={topic} key={topic.id}></TopicButtonClose>)
        }
    </div>
  )
}

export default TopicChoosed