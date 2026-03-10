import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.postimg.cc/Kz1SzLvr/Atelier-PH7-08-Web.jpg"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  Modern Building Management
                </h1>
                <p className="text-lg">
                  Find your perfect apartment easily
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.postimg.cc/LXJKXf6t/home-living.jpg"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  Comfortable Living Space
                </h1>
                <p className="text-lg">
                  Experience luxury apartments
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.postimg.cc/638J3R5v/tmp-a7sfkgim194lbchs6uc096it1m.jpg"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  Smart Apartment System
                </h1>
                <p className="text-lg">
                  Manage your apartment digitally
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;