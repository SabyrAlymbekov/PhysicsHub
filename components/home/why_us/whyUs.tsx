"use client"
import React from 'react';
// import { createContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import {Mousewheel, Scrollbar, Keyboard, Autoplay} from 'swiper/modules';

const WhyUs = () => {
    return (
        <section className="bg-gray-100 w-full py-[50px]">
            <div className="container lg:flex lg:justify-between lg:gap-10 ">
                <div className="lg:w-1/2 flex items-center">
                    <Swiper
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar, Keyboard, Mousewheel, Autoplay]}
                        spaceBetween={30}
                        loop={true}
                        className="mySwiper"
                        slidesPerView={1}
                        keyboard={{enabled: true}}  // Включаем навигацию по стрелкам на клавиатуре
                        mousewheel={true}             // Включаем поддержку скролла по трекпаду и мыши
                        autoplay={{
                            delay: 3000, // Интервал автопереключения в миллисекундах (здесь 3 секунды)
                            disableOnInteraction: false, // Автоплей не останавливается при взаимодействии с слайдами
                        }}
                    >
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rounded-xl w-full overflow-hidden">
                                <img className="w-[100%] object-center object-cover"
                                     src="https://sun9-54.userapi.com/s/v1/ig2/CCEhdghflYZ-nAvltdzl88NT6uUboLW6R2-WfUhqctrJvpumCCNRDbG5SONq2Pm8LztCLXihaOQLzIhrqJswIqim.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,1920x1152&from=bu&u=9YKZhQyWzrv6EePQBb5eubmpArRG0eYPU6dgdDGK4KM&cs=807x484"
                                     alt="team photo"/>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="xl:w-1/2">
                    <h2 className="text-4xl sm:text-6xl md:text-[3.5em] mt-8 font-bold text-black">Что такое Physics Hub?</h2>
                    <div className="mt-4 text-xl text-gray-600 md:text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur consectetur
                        earum
                        est maiores numquam repudiandae rerum voluptatem. Laudantium, vel!
                    </div>
                    <div className="mt-3 text-xl text-gray-600 md:text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aliquam commodi, debitis
                        dolores eaque eligendi exercitationem explicabo ipsa magni, necessitatibus nihil nobis
                        perspiciatis
                        quia repellat suscipit veniam vitae voluptate?
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;