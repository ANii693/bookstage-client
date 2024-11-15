import Link from "next/link";
import React from "react";
import bannerImg from "../../../../public/assets/img/trending/flash/flash-banner-01.jpg";
import Image from "next/image";
const FlashBanner = () => {
  return (
    <>
      <div className="col-xl-12 col-lg-12">
        <Link href="/shop">
          <div className="bd-flash___banner-item mb-30 p-relative">
            <div className="bd-flash__banner-thumb w-img">
              <Image
                src={bannerImg}
                width={500}
                height={500}
                style={{ width: "100%", height: "auto" }}
                alt="flash-banner"
              />
            </div>
            <div className="bd-flash__banner-content">
              <h4>Freshly</h4>
              <h3>Maitta Potato</h3>
              <h6>
                From<span className="price">$9.00</span>
              </h6>
            </div>
            <div className="bd-flash__banner-shape">
              <div className="text">
                <span>Hot</span>Item
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FlashBanner;
