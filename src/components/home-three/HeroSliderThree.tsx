"use client";
import Link from "next/link";
import React from "react";
import { Scrollbar, A11y, Autoplay, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { offerProductType } from "@/interFace/api-interFace";
import HeroSliderPreloader from "@/preloaders/HeroSliderPreloader";

interface productsType {
  product: offerProductType[];
}

const HeroSliderThree = ({ product }: productsType) => {
  return (
    <div className="bd-banner-active-2 swiper-container">
      <div className="swiper-wrappers">
        <Swiper
          modules={[EffectFade, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          effect={"fade"}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
            el: ".banner-pagination-2",
          }}
        >
         
          {
            product?.length ?
            <>
             {product.slice(0, 4).map((item, num: number) => {
            return (
              <SwiperSlide key={num}>
                <div className="swiper-slides">
                  <div
                    className="bd-singel__product-banner product-thumb-bg-2 mb-30"
                    style={{ backgroundImage: `url(${item.banner})` }}
                  >
                    <div className="bd-product__banner-inner  product__content-4">
                      <div className="bd-product__banner-content">
                        <h2 data-animation="fadeInLeft" data-delay="1.5s">
                          {item.productName}
                        </h2>
                        <p data-animation="fadeInLeft" data-delay="1.5s">
                          {item.productDetails.slice(0, 50)} <br />{" "}
                          {item.productDetails.slice(50, 100)}{" "}
                        </p>
                        <div
                          data-animation="fadeInLeft"
                          data-delay="1.7s"
                          className="product__banner-price-2"
                        >
                          <h3>
                            $
                            {item?.price % 1 === 0
                              ? `${item?.price}.00`
                              : item?.price.toFixed(2)}
                          </h3>
                        </div>
                        <Link
                          className="bd-bn__btn-4"
                          href={`/shop-details/${item.productId}`}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
            </>
            :
            <>
              <HeroSliderPreloader/>
            </>
          }
         
        </Swiper>
        <div className="banner-pagination-2"></div>
      </div>
    </div>

  );
};

export default HeroSliderThree;
