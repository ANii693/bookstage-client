import React from "react";
import thumbOne from "../../../public/assets/img/about/about-img-3.jpg";
import thumbTwo from "../../../public/assets/img/about/about-img-4.jpg";
import thumbThree from "../../../public/assets/img/about/about-img-5.jpg";
import authorImg from "../../../public/assets/img/about/about-author.png";
import authorSigneture from "../../../public/assets/img/about/author-signature.png";
import Image from "next/image";
const AboutSectionTwo = () => {
  
  return (
    <section className="bd-about__area pt-130 pb-65">
      <div className="container">
        <div className="row g-0">
          <div className="col-xxl-5 col-xl-5 col-lg-6">
            <div className="bd-about__wrapper mb-60">
              <div className="bd-about__image-1 m-img mb-60">
                <Image src={thumbOne} alt="about-image" />
              </div>
              <div className="bd-about__image-2 m-img">
                <Image src={thumbTwo} alt="about-image" />
              </div>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-6">
            <div className="bd-about__content-box mb-60">
              <div className="bd-section__title-wrapper mb-50">
                <span className="bd-sub__title">About Us</span>
                <h2 className="bd-section__title mb-30">
                  We believe in pure and <br /> organic quality
                </h2>
              </div>
              <div className="bd-about__inner">
                <div className="bd-about__image-3">
                  <Image src={thumbThree} alt="about-image" />
                </div>
                <div className="bd-about__info">
                  <p>
                    We had reached a great height in the atmosphere, for the sky
                    was a dead black, and the stars had ceased to twinkle. By
                    the same illusion which lifts the horizon of the sea to the
                    level. Always be able to find the phone that you are looking
                    for in our offer, have made us stand out in the market, but
                    they are simply symptoms of our dedication to what we are
                    doing and our desire to constantly.
                  </p>
                  <div className="bd-about__author">
                    <div className="bd-about__author-thumb">
                      <Image src={authorImg} alt="about-image" />
                    </div>
                    <div className="bd-about__author-info">
                      <h4>Noyaviram</h4>
                      <span>Founder & CEO, Orgado</span>
                      <div className="ba-author__signature">
                        <Image src={authorSigneture} alt="about-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
