"use client";
import React,{useState,useEffect} from "react";
import { Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Link from "next/link";
import Image from "next/image";
import { SubCategoryType } from "@/interFace/api-interFace";
import axios from "axios";
const BrandSlider = () => {
  const [subCategory, setSubCategory] = useState<SubCategoryType[]>([]);
  useEffect(() => { 
    axios
      .get(`${process.env.BASE_URL}setting/sub-categroy`)
      .then((res) => {
        setSubCategory(res.data);
      })
      .catch((e) => {});
  }, []);

  return (
    <div className="bd-brand__area grey-bg pt-95 pb-65">
      <div className="container">
        <div className="row  justify-content-between">
          <div className="col-12">
            <div className="bd-brand-active swiper-container">
              <div className="swiper-wrappers">
                {
                  subCategory.length ?
                  <>
                  <Swiper
                  modules={[Scrollbar, A11y, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  breakpoints={{
                    500: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 5,
                    },
                    1400: {
                      slidesPerView: 6,
                    },
                  }}
                >
                  {/* {subCategory?.length ?
                    subCategory?.map((item) => (
                      <SwiperSlide key={item?._id}>
                        <div className="swiper-slides">
                          <div className="bd-singel__brand mb-30">
                            <Link href="#">
                              <Image
                                style={{ width: "auto", height: "100%" }}
                                width={500} height={500}
                                src={item?.brandImg}
                                alt="brand-thumb"
                              />
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    )):
                    <> </>
                    } */}
                </Swiper>
                  </>
                  :
                  <>
                   <p className="text-center"> No Brand Found </p>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
