import Link from "next/link";
import React from "react";
import bannerOne from "../../../public/assets/img/banner/side-ball.png";//banner-shape-1.png
import bannerThree from "../../../public/assets/img/banner/banner-shape-2.png";//banner-shape-2.png
import bannerFive from "../../../public/assets/img/banner/toys-banner.png"; //banner-3toys-banner.png
import bannerTwo from "../../../public/assets/img/banner/discount-shape.png";
import bannerFour from "../../../public/assets/img/banner/curved-arrow.png";
import Image from "next/image";
const HeroSectionTwo = () => {
  return (
    <section className="bd-banner__area grey-bg banner-height-2 d-flex align-items-center p-relative">
      <div className="bd-banner__shape-1">
        <Image
          src={bannerOne}
          style={{ width: "45%", height: "auto" }}
          alt="banner-shape"
        />
      </div>
      <div className="bd-banner__discount-shape">
        <Image
          src={bannerTwo}
          style={{ width: "100%", height: "auto" }}
          alt="discount-shape"
        />
        <div className="discount-text">
          <span>50%</span>off
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="bd-singel__banner mt-70 d-flex align-items-center">
            <div className="col-xl-7 col-lg-6 col-md-6 col-12">
              <div className="bd-banner__content__wrapper p-relative">
                <div className="bd-banner__text-shape">
                  <Image
                    src={bannerThree}
                    style={{ width: "90%", height: "auto" }}
                    alt="banner-shape"
                  />
                </div>
                <div className="bd-banner__btn-shape">
                  <Image
                    src={bannerFour}
                    style={{ width: "100%", height: "auto" }}
                    alt="curved-arrow"
                  />
                </div>
                <div className="bd-banner__content-2">
                  <h2>
                  Showcase <br /> Your talent
                  </h2>
                  <p>
                  {/* Play Your Way: Rent, Buy, Create, Repair, and Share {" "}
                    <br /> Where Every Toy Tells Your Story{" "} */}
                  </p>
                  <div className="bd-banner__btn">
                    <Link className="bd-bn__btn-1" href="/shop">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6">
              <div className="bd-banner__thumb">
                <Image
                  src={bannerFive}
                  style={{ width: "100%", height: "auto" }}
                  alt="banner-3.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionTwo;
