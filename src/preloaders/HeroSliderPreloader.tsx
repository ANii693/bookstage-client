import { productsPreloader } from "@/data/preloader-data";
import React from "react";
import bannerBg from "../../public/assets/img/loadding/banner-main-.png";
const HeroSliderPreloader = () => {
  return (
    <>
      
        <div className="swiper-slides">
          <div
            className="bd-singel__product-banner product-thumb-bg-2 mb-30 og-div-bg"
            style={{ backgroundImage: `url(${bannerBg})` }}
          >
            <div className="bd-product__banner-inner  product__content-4">
              <div className="bd-product__banner-content"></div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default HeroSliderPreloader;
