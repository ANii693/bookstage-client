"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import axios from "axios";
import { CategoryType } from "@/interFace/api-interFace";
import Image from "next/image";
import { productsPreloader } from "@/data/preloader-data";

const CategorySlider = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}setting/category`).then((res) => {
      setCategories(res.data);
    })
    .catch(e=> console.log(e))
  }, []);

  return (
    <div className="bd-catergory__area pb-40">
      <div className="container">
        {categories.length ? (
          <div className="row">
            <div className="col-12">
              <div className="bd-category-active swiper-container">
                <div className="swiper-wrappers">
                  <Swiper
                    modules={[Scrollbar, A11y, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: true,
                    }}
                    breakpoints={{
                      400: {
                        slidesPerView: 2,
                      },
                      576: {
                        slidesPerView: 3,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      992: {
                        slidesPerView: 5,
                      },
                      1200: {
                        slidesPerView: 6,
                      },
                      1400: {
                        slidesPerView: 8,
                      },
                    }}
                  >
                    { categories?.length ? categories.map((item, num) => {
                      return (
                        <SwiperSlide key={num}>
                          <div className="swiper-slides">
                            <div className="bd-singel__category category_div_height text-center mb-30">
                              <div className="bd-category__img">
                                <Link href="/shop">
                                  <Image
                                    src={item.categoryThumb}
                                    alt="cateegory-img"
                                    width={80}
                                    height={100}
                                    style={{ width: "auto", height: "auto" }}
                                  />
                                </Link>
                              </div>
                              <div className="bd-category__text">
                                <span className="bd-category__title">
                                  <Link href="/shop">{item.categoryName}</Link>
                                </span>
                                
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    }
                   
                    ):
                    <>
                    {
                      productsPreloader.map((item,num)=>(
                        <SwiperSlide key={num}>
                        <div className="swiper-slides">
                          <div className="bd-singel__category category_div_height text-center mb-30">
                            <div className="bd-category__img og-custom-div">
                                
                            </div>
                            
                          </div>
                        </div>
                      </SwiperSlide>
                      ))
                    }
                    </>
                    }
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        ):
        <></>}
      </div>
    </div>
  );
};

export default CategorySlider;
