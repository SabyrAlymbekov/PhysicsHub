'use client';
import React, {useState} from 'react';
import { Swiper as SwiperType }  from 'swiper'; // Импорт Swiper для типизации
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image, {StaticImageData} from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  views: (StaticImageData | string)[];
  sizes: string[];
  inStock: boolean;
  images?: string[]; // Делайте images опциональным, если оно не обязательно
}

const SwiperOfProduct: React.FC<{ product: Product }> = ({ product }) => {
  const [thumbsSwiperMobile, setThumbsSwiperMobile] = useState<SwiperType | null>(null);
  const [thumbsSwiperDesktop, setThumbsSwiperDesktop] = useState<SwiperType | null>(null);

  return (
    <>
      {/* Mobile Swiper */}
      <div className=" flex-column lg:hidden w-full gap-10">
        {/* Main Swiper */}
        <Swiper
          style={{
            ['--swiper-navigation-color' as any]: '#00b2ff',
            ['--swiper-pagination-color' as any]: '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiperMobile}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 mb-5"
        >
          {product.views.map((view, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center rounded-lg">
              <div className="w-[80%] p-10">
                <Image
                  src={view}
                  alt={`${product.name} Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper (Horizontal) */}
        <Swiper
          onSwiper={setThumbsSwiperMobile}
          direction="horizontal" // Убедитесь, что это горизонтальное направление
          loop={true}
          spaceBetween={10}
          slidesPerView={4} // Количество видимых слайдов
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-full h-[90px] mb-5"
        >
          {product.views.map((view, index) => (
            <SwiperSlide key={index} className="flex items-center w-[75px] h-[75px] justify-center cursor-pointer">
              <div className="w-[75px] h-[75px]">
                <Image
                  src={view}
                  alt={`${product.name} Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Swiper */}
      <div className="hidden lg:flex flex-row-reverse h-[700px] w-full gap-10">
        {/* Main Swiper */}
        <Swiper
          style={{
            ['--swiper-navigation-color' as any]: '#00b2ff',
            ['--swiper-pagination-color' as any]: '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiperDesktop}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {product.views.map((view, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center rounded-lg">
              <div className="w-[80%]">
                <Image
                  src={view}
                  alt={`${product.name} Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiperDesktop}
          loop={true}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-[100px] overflow-hidden"
        >
          {product.views.map((view, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center cursor-pointer">
              <div className="w-full h-full">
                <Image
                  src={view}
                  alt={`${product.name} Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperOfProduct;