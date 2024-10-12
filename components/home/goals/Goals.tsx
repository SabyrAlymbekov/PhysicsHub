'use client'

const Goals = () => {
    return (
        <section className="container flex justify-between flex-col items-center w-full py-[50px] md:py-[100px] lg:flex-row">
            <div className="sm:w-full ">
                <h3 className="text-4xl sm:text-5xl font-bold md:text-7xl uppercase">Место объединяющее физиков <span className="text-gradient">со всего мира</span></h3>
                <p className="text-2xl my-6">
                    Главная идея/цель проекта заключается в Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do eiusmod tempor. lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur adipiscing elit, также наши цели.
                </p>
                <ul className="list-disc text-2xl ml-10 flex flex-col gap-2">
                    <li className="">
                        Собрать хорошие ресурсы для изучения физика
                    </li>
                    <li className="">
                        Создать комьюнити идейных физиков
                    </li>
                    <li className="">
                        Помочь людям погрузиться в мир физики
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Goals;