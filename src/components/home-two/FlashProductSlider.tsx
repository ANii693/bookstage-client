"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Scrollbar, A11y, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import FlashIcon from "@/sheardComponent/elements/icons/flash-icon";
import axios from "axios";
import { CartProductType } from "@/interFace/interFace";
import Image from "next/image";
import GetRatting from "@/hooks/GetRatting";

const FlashProductSlider = () => {
  const [products, setproducts] = useState<CartProductType[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/best-selling-products`)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="col-xl-12 col-lg-12">
      <div className="bd-section__title-wrapper d-flex align-items-center mb-40">
        <div className="bd-section__title-icon  blink">
          <FlashIcon />
        </div>
        <div className="bd-sm__section-title">
          <h3>Flash Sale!</h3>
        </div>
      </div>
      <div className="bd-flash___inner p-relative">
        <div className="bd-flash-active swiper-container">
          {products.length ? (
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
                  nextEl: ".flash-button-next",
                  prevEl: ".flash-button-prev",
                }}
              >
                {products?.length &&
                  products?.slice(0, 5).map((item, num) => {
                    const sum = item?.rettings?.reduce(
                      (acc: number, currentValue: number) => acc + currentValue,
                      0
                    );

                    const rettingsLength = item?.rettings?.length;
                    const rowRetting =
                      rettingsLength > 0 ? sum / rettingsLength : 0;
                    const averageRating = parseFloat(rowRetting.toFixed(1));
                    return (
                      <SwiperSlide key={num}>
                        <div className="swiper-slides">
                          <div className="bd-flash__item text-center p-relative mb-30">
                            <div className="bd-flash__discount">
                              <div className="price">
                                {item?.offer === true ? (
                                  <>
                                    <span>{`OFF`}</span>
                                    {item?.offerPersent}%
                                  </>
                                ) : (
                                  <>
                                    <span>New</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="bd-flash__thumb w-img">
                              <Link href={`/shop-details/${item?._id}`}>
                                {" "}
                                <Image
                                  width={500}
                                  height={500}
                                  style={{ width: "100%", height: "auto" }}
                                  src={item?.img}
                                  alt="populer-thumb"
                                />
                              </Link>
                            </div>
                            <div className="bd-flash__content-box">
                              <div className="bd-flash__content mb-30">
                                <h4 className="bd-product__title">
                                  <Link href={`/shop-details/${item?._id}`}>
                                    {item?.productName}
                                  </Link>
                                </h4>
                                <div className="bd-product__price">
                                  {item?.offer === true ? (
                                    <span className="bd-product__old-price">
                                      <del>
                                        {`₹${
                                          item?.oldPrice % 1 === 0
                                            ? `${item?.oldPrice}.00`
                                            : item?.oldPrice.toFixed(2)
                                        }`}
                                      </del>
                                    </span>
                                  ) : (
                                    <></>
                                  )}

                                  {item?.price % 1 === 0 ? (
                                    <span className="bd-product__new-price">₹{`${item?.price}.00`}</span>
                                  ) : (
                                    <span className="bd-product__new-price">
                                      ₹{item?.price.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                <div className="bd-product__icon">
                                  <GetRatting averageRating={averageRating} />
                                </div>
                              </div>
                              <div className="count-down__style">
                                <div className="bd-countdown-wrapper">
                                  <div
                                    className="bd-product__countdown justify-content-center in-art-item"
                                    data-countdown="2023/02/25"
                                  ></div>
                                </div>
                              </div>
                              <div className="bd-flash__stock">
                                <span className="available-text">
                                  Available :
                                </span>
                                <span>
                                  <span className="available-count">
                                    <Link href="/shop">
                                      {item?.productQuantity}{" "}
                                    </Link>
                                  </span>
                                  Stock
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="bd-flash__nav">
          <button className="flash-button-prev">
            <i className="fa-regular fa-angle-left"></i>
          </button>
          <button className="flash-button-next">
            <i className="fa-regular fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashProductSlider;
