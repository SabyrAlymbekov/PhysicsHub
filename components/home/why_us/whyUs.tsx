"use client"
import React from 'react';
import Image from 'next/image';

const WhyUs = () => {
    return (
        <section className="bg-gray-100 w-full py-[50px]">
            <div className="container lg:flex lg:justify-between lg:gap-10 ">
                <div className="lg:w-1/2 flex items-center">
                    <Image src="/assets/images/teamphoto.jpg" alt="team image" width={600} height={300} className="w-[100%] object-center object-cover rounded-lg"></Image>
                </div>
                <div className="lg:w-1/2">
                    <h2 className="text-4xl sm:text-6xl md:text-[3.5em] mt-8 font-bold text-black">Physics Hub</h2>
                    <div className="mt-4 text-xl text-gray-600 md:text-2xl">
                     — также это международное сообщество 🌎 для любителей науки, основанное Нурсултаном Раяповым, призёром олимпиад 🥇 и членом сборной Кыргызстана по физике 🏆. На всех наших платформах уже 11 000 человек . Наша команда создает анимации 🪄, сайты, разбирает сложные задачи 📖 и проводит международные олимпиады
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;