import React from "react";
import { productsPreloader } from "@/data/preloader-data";
import bannerBg from "../../public/assets/img/loadding/banner-bg-first.png";
const BannerPreloader = () => {
  return (
    <>
      {productsPreloader.length &&
        productsPreloader.slice(0, 2).map((item, index) => (
          <div className="col-xl-12 col-md-6" key={index}>
            <div
              className="bd-singel__product-banner product-thumb-bg mb-30 og-div-bg"
              style={{ backgroundImage: `url(${bannerBg})` }}
            >
              <div className="bd-product__banner-inner">
                <div className="bd-product__banner-content banner-oil product__content-3">
                  <h3 className="bd-product__title"></h3>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default BannerPreloader;
