"use client"
import React from 'react';
// import Image from 'next/image';

const WhyUs = () => {
    return (
        <section className="bg-gray-100 w-full py-10">
            <div className="container lg:flex lg:justify-between lg:gap-10 ">
                    <h2 className="text-4xl sm:text-6xl md:text-[3.5em] mt-8 font-bold text-black text-center">Почему мы?</h2>
                    <div className="mt-4 text-xl text-gray-600 md:text-2xl">
                        У нас вы найдете все, что вам нужно для изучения физики. Вы можете:
                        Найти любую книгу по интересующей вас теме с рецензинми
                        Практиковаться, решая задачи
                        Общаться с другими участниками на нашем форуме
                    </div>
            </div>
        </section>
    );
};

export default WhyUs;
