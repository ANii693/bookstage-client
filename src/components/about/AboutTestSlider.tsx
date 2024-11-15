"use client";
import React from "react";
import { Scrollbar, A11y, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { testimonialList } from "@/data/testimonial-data";
import Image from "next/image";

const AboutTestSlider = () => {
  return (
    <section className="bd-testimonial__area grey-bg pt-130 pb-120">
      <div className=" container">
        {testimonialList && (
          <div className="row g-0 justify-content-center">
            <div className="col-xxl-8 col-xl-9 col-lg-10">
              <div className="bd-testimonial__inner p-relative">
                <div className="bd-testimonial-active swiper-container">
                  <div className="swiper-wrappers">
                    <Swiper
                      modules={[Navigation, Scrollbar, A11y, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      loop={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                      navigation={{
                        nextEl: ".testimonial-button-next",
                        prevEl: ".testimonial-button-prev",
                      }}
                    >
                      {testimonialList.slice(3, 5).map((item, num) => {
                        return (
                          <SwiperSlide key={num}>
                            <div className="swiper-slides">
                              <div className="bd-testimonial__wrapper text-center">
                                <div className="bd-testimonial__thumb">
                                  <Image
                                    src={item.icon}
                                    alt="testimonial-image"
                                    width={100}
                                    height={100}
                                    style={{ width: "auto", height: "auto" }}
                                  />
                                </div>
                                <div className="bd-testimonial__content">
                                  <p>{item.desc}</p>
                                  <div className="bd-testimonial__author">
                                    <h3>{item.author}</h3>
                                    <span>{item.designation}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
                <div className="bd-testimonial__navigation">
                  <button className="testimonial-button-prev">
                    <i className="fa-regular fa-angle-left"></i>
                  </button>
                  <button className="testimonial-button-next">
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutTestSlider;
