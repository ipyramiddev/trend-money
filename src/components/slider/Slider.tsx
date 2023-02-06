import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';


import pool_data from "pool_data";
import { SubStrat } from "components/SliderCard";
import "./Slider.css";


export default () => {
    return (
        <Swiper
            modules={[Navigation, EffectCoverflow]}
            autoplay={{ delay: 2500 }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 80,
                modifier: 4,
                slideShadows: true,
            }}
            loop={true}
            className="mySwiper"
            spaceBetween={90}
            navigation={true}
        >
            {pool_data.seamPools[0].pools.map((pool: any, index: number) => {
                return (
                    <SwiperSlide key={`swiper-slide-${index}`}>
                        <div className="slide">
                            <SubStrat pool={pool} key={index} />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};