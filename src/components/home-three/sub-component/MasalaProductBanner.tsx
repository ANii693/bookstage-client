import Link from "next/link";
import React from "react";
import thumb from "../../../../public/assets/img/trending/flash/trending-banner.png"
import Image from "next/image";
const MasalaProductBanner = () => {
  return (
    <>
      <Link href="/shop-details">
        
          <div className="bd-trending__banner p-relative mb-50">
            <div className="bd-trending__banner-thumb w-img">
              <Image
                src={thumb}
                alt="trending-banner"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="bd-td__banner-text">
              <span>Organic</span>
              <h3>Fresh Masala</h3>
            </div>
          </div>
        
      </Link>
      
    </>
  );
};

export default MasalaProductBanner;
