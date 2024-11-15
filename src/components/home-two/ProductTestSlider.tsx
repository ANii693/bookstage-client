"use client";
import React, { useState, useEffect } from "react";
import { Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import axios from "axios";
import GetRatting from "@/hooks/GetRatting";
import { UserReviewType } from "@/interFace/api-interFace";
import Image from "next/image";
import defaultIcon from "../../../public/assets/img/testimonial/testimonial-1.png"

const ProductTestSlider = () => {
  const [products, setproducts] = useState<UserReviewType[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/best-reviews`)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="col-xl-12 col-lg-12">
      <div className="bd-quite-active swiper-container">
        {products && (
          <div className="swiper-wrappers">
            <Swiper
              modules={[Scrollbar, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
            >
              {products.slice(0, 5).map((item, num) => {
                return (
                  <SwiperSlide key={num}>
                    <div className="swiper-slides">
                      <div className="bd-trending__quite text-center mb-30">
                        <div className="bd-trending__quite-thumb">
                          <Image src={item?.img ? item?.img : defaultIcon} width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }} alt="trending-quite" />
                        </div>
                        <div className="bd-tending__quite-meta">
                          <h4 className="text-capitalize">{item.name}</h4>
                          
                        </div>
                        <div className="bd-trending__quite-text">
                          <p>{`" ${item.review} "`}</p>
                        </div>
                        <div className="bd-trending__quite-icon">
                          <GetRatting averageRating={item.retting} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTestSlider;
