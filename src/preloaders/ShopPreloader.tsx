import Image from "next/image";
import Link from "next/link";
import React from "react";
import loadingImg from "../../public/assets/img/loadding/loading-img.png";
import { productsPreloader } from "@/data/preloader-data";
const ShopPreloader = ({end}:any) => {
 
  return (
    <>
      {productsPreloader?.length ? (
        <>
          {productsPreloader.slice(0,end).map((item: any, index: number) => {
            return (
              <div
                className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                key={index}
              >
                <div className="bd-trending__item text-center mb-30 position-relative">
                  <div className="bd-trending__product-thumb border-5">
                    <Link href="">
                      <Image
                        src={loadingImg}
                        alt="product-img"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                    
                  </div>
                  <div className="bd-teanding__content">
                    <h4 className="bd-product__title or-prodcut-title">
                     
                    </h4>
                    <div className="bd-product__price">
                      <span className="bd-product__old-price or-old-price">
                         
                      </span>
                    </div>

                    <div className="bd-product__icon">
                        
                    </div>
                  </div>
                  <div className="bd-product__tag">
                    <div className="tag-text theme-bg or-product-status"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p>No Product</p>
        </>
      )}
    </>
  );
};

export default ShopPreloader;
