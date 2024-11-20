'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  views: string[]; // Убедитесь, что это не `string[] | undefined`
  sizes: string[];
  inStock: boolean;
  description: string;
}

const SwiperOfProduct: React.FC<{ product: Product }> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  return (

    <>

      <div className="flex lg:hidden flex-row-reverse h-[400px] md:h-[500px] w-full gap-10 ">
        {/* Main Swiper for product images */}
        <Swiper
          style={{
            '--swiper-navigation-color': '#000000',
            '--swiper-pagination-color': '#000000',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 "
        >
          {product.views && product.views.length > 0 ? (
            product.views.map((view, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center rounded-lg">
                <div className="w-[80%]">
                  <Image
                    src={view}
                    alt={`${product.name} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center text-gray-500">No images found</div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-[100px] overflow-hidden"
        >
          {product.views && product.views.length > 0 ? (
            product.views.map((view, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="w-[]">
                  <Image
                    src={view}
                    alt={`${product.name} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center text-gray-500">No thumbnails</div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      <div className="hidden lg:flex flex-row-reverse h-[700px] w-full gap-10 ">
        {/* Main Swiper for product images */}
        <Swiper
          style={{
            '--swiper-navigation-color': '#000000',
            '--swiper-pagination-color': '#000000',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiper}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 "
        >
          {product.views && product.views.length > 0 ? (
            product.views.map((view, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center rounded-lg">
                <div className="w-[80%]">
                  <Image
                    src={view}
                    alt={`${product.name} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center text-gray-500">No images found</div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-[100px] overflow-hidden"
        >
          {product.views && product.views.length > 0 ? (
            product.views.map((view, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="w-[]">
                  <Image
                    src={view}
                    alt={`${product.name} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center text-gray-500">No thumbnails</div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperOfProduct;