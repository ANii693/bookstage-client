import React from 'react';
import { EffectFade, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CountUpContent from '../common/counter/CountUpContent';
import thumbOne from "../../../public/assets/img/banner/slider/slider-01.jpg"
import thumbTow from "../../../public/assets/img/banner/slider/slider-02.jpg"
import thumbThree from "../../../public/assets/img/banner/slider/slider-03.jpg"
import Image from 'next/image';

const HeroSlider = () => {
    return (
        <div className="bd-banner__right p-relative z-index-1 mb-60">
            <div className="bd-banner__active  swiper-container">
                <div className="swiper-wrappers">
                    <Swiper
                        modules={[EffectFade, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={30}
                        effect={"fade"}
                        slidesPerView={1}
                        
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true
                        }}
                        pagination={{
                            clickable: true,
                            el: '.bd-banner-pagination',
                        }}
                    >
                        <SwiperSlide>
                            <div>
                                <div className="bd-banner__image-2">
                                    <Image style={{ width: "100%", height: "auto" }} src={thumbOne} alt="banner-img" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <div className="bd-banner__image-2">
                                <Image style={{ width: "100%", height: "auto" }} src={thumbTow} alt="banner-img" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <div className="bd-banner__image-2">
                                <Image style={{ width: "100%", height: "auto" }} src={thumbThree}  alt="banner-img" />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="bd-banner__shape">
               
                <span className="counter"><CountUpContent number={80} text="k" /></span>
                <span className="bd-banner__shape-line"></span>
                <p>Metric ton product <br />supplied</p>
            </div>
            <div className="bd-banner-pagination banner-pagination-1"></div>
        </div>
    );
};

export default HeroSlider;