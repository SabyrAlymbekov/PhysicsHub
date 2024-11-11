import { Skeleton } from '@/components/ui/skeleton';

const TopicFiltersSkeleton = () => {
    const topicsSkeletons = [
        <Skeleton className="w-[70px] h-[32px] rounded-full" key={0} />,
        <Skeleton className="w-[85px] h-[32px] rounded-full" key={1} />,
        <Skeleton className="w-[90px] h-[32px] rounded-full" key={2} />,
        <Skeleton className="w-[100px] h-[32px] rounded-full" key={3} />,
        <Skeleton className="w-[110px] h-[32px] rounded-full" key={4} />,
        <Skeleton className="w-[120px] h-[32px] rounded-full" key={5} />,
        <Skeleton className="w-[130px] h-[32px] rounded-full" key={6} />,
        <Skeleton className="w-[140px] h-[32px] rounded-full" key={7} />,
        <Skeleton className="w-[150px] h-[32px] rounded-full" key={8} />,
        <Skeleton className="w-[160px] h-[32px] rounded-full" key={9} />,
        <Skeleton className="w-[170px] h-[32px] rounded-full" key={10} />,
        <Skeleton className="w-[75px] h-[32px] rounded-full" key={11} />,
        <Skeleton className="w-[80px] h-[32px] rounded-full" key={12} />,
        <Skeleton className="w-[95px] h-[32px] rounded-full" key={13} />,
        <Skeleton className="w-[105px] h-[32px] rounded-full" key={14} />,
        <Skeleton className="w-[115px] h-[32px] rounded-full" key={15} />,
        <Skeleton className="w-[125px] h-[32px] rounded-full" key={16} />,
        <Skeleton className="w-[135px] h-[32px] rounded-full" key={17} />,
        <Skeleton className="w-[145px] h-[32px] rounded-full" key={18} />,
        <Skeleton className="w-[155px] h-[32px] rounded-full" key={19} />,
      ];
      return <div className='py-6 px-4 flex flex-col w-full lg:w-[400px] border rounded-md h-fit gap-3'>
      <h1 className="font-semibold text-2xl">выберите теги: </h1>
      <div className='flex flex-wrap h-fit gap-2'>
        {topicsSkeletons}
      </div>
    </div>
}

export default TopicFiltersSkeleton