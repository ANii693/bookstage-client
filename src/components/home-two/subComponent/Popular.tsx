"use client";
import GetRatting from "@/hooks/GetRatting";
import { CartProductType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Popular = () => {
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
    <>
      <div className="bd-top__populer-area">
        <div className="bd-sm__section-wrapper d-flex align-items-center justify-content-between mb-45">
          <div className="bd-sm__section-title">
            <h3>Popular</h3>
          </div>
          <div className="bd-section__arrow">
            <Link href="/shop">
              View All <i className="fa-regular fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
        <div className="bd-populer__item-wrapper mb-30">
          {
            products.length ?
            <>
             {
              products.slice(0, 3).map((item, num) => {
                const sum = item?.rettings.reduce(
                  (acc: number, currentValue: number) => acc + currentValue,
                  0
                );
    
                const rettingsLength = item?.rettings.length;
                const rowRetting = rettingsLength > 0 ? sum / rettingsLength : 0;
                const averageRating = parseFloat(rowRetting.toFixed(1));
                return (
                  <div className="bd-populer__item" key={num}>
                    <div className="bd-populer__thumb">
                      <Link href={`/shop-details/${item?._id}`}>
                        <Image
                          width={50}
                          height={60}
                          style={{ width: "100%", height: "auto" }}
                          src={item?.img}
                          alt="populer-thumb"
                        />
                      </Link>
                    </div>
                    <div className="bd-populer__info">
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
                  </div>
                );
              })
             }
            </>
            :
            <>
             <p className="text-center mt-3">No Popular Product Found</p>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Popular;
