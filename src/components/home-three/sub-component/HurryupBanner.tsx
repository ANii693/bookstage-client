import Link from "next/link";
import React from "react";
import bgImg from "../../../../public/assets/img/product/banner/product-banner-09.jpg";
import bgImg2 from "../../../../public/assets/img/product/banner/product-banner-10.jpg";
import TimerWrapper from "@/utils/TimerWrapper";
const HurryupBanner = () => {
  return (
    <>
      <div className="col-xl-5 col-lg-6">
        <div
          className="bd-singel__product-banner product-thumb-bg mb-70"
          style={{ backgroundImage: `url(${bgImg.src})` }}
        >
          <div className="bd-product__banner-inner">
            <div className="bd-product__banner-content banner-food  product__content-2">
              <span>Fresh and pure</span>
              <h3>
                <Link href="/shop">Food and Fruits</Link>
              </h3>
              <p>Feed your family fresh</p>
              <Link className="bd-bn__btn-3" href="/shop">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-7 col-lg-6">
        <div
          className="bd-singel__product-banner product-thumb-bg mb-70"
          style={{ backgroundImage: `url(${bgImg2.src})` }}
        >
          <div className="bd-product__banner-inner">
            <div className="bd-product__spacial-banner text-center">
              <h3>Hurry up!</h3>
              <div className="discount__button-wrapper">
                <span className="discount-btn">
                  <span>50%</span> OFF
                </span>
                <span className="discount__end-btn">Ends in</span>
                
              </div>
              <div className="count-down__style-2">
                  <div className="bd-countdown-wrapper">
                    <div
                      className="bd-product__countdown in-art-item"
                      data-countdown="2022/12/25"
                    >
                      <TimerWrapper />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HurryupBanner;
