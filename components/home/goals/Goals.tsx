'use client'

const Goals = () => {
    return (
        <section className="container flex justify-between flex-col items-center w-full lg:flex-row my-[100px]">
            {/* <div className="w-[700px] h-[700px] radialbg absolute"></div> */}
            <div className="sm:w-full z-2 my-10 lg:my-0 coo">
                <h3 className="text-4xl sm:text-5xl font-bold md:text-7xl uppercase">Место объединяющее физиков <span className="text-gradient">со всего мира</span></h3>
                <p className="text-2xl my-6">
                    Главная идея/цель проекта заключается в создании идеальной среды для изучения физики. Вы сможете:
                </p>
                <ul className="list-disc text-2xl ml-10 flex flex-col gap-2">
                    <li className="">
                        Найти любую книгу по интересующей вас теме с рецензиями
                    </li>
                    <li className="">
                        Практиковаться, решая задачи
                    </li>
                    <li className="">
                        Узнавать первыми о грядущих олимпиадах и других событиях 
                    </li>
                    <li className="">
                        Общаться с другими участниками на нашем форуме
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Goals;
