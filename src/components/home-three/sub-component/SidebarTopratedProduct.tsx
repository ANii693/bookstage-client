"use client";
import GetRatting from "@/hooks/GetRatting";
import { ProductType } from "@/interFace/api-interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SidebarTopratedProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/trending-products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="bd-sidebar__top-rated-area mb-30">
      <div className="bd-top__rated-area">
        <div className="bd-sm__section-title d-flex align-items-center justify-content-between mb-35">
          <div className="bd-sm__section-title">
            <h3>Top Rated</h3>
          </div>
          <div className="bd-section__arrow">
            <Link href="/shop">
              View All<i className="fa-regular fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
         {
          products?.length ?
          <>
           {products?.length && (
          <div className="bd-populer__item-wrapper">
            {products.slice(0, 4)?.map((item, key) => {
              const sum = item.rettings.reduce(
                (acc: number, currentValue: number) => acc + currentValue,
                0
              );

              const rettingsLength = item.rettings.length;
              const rowRetting = rettingsLength > 0 ? sum / rettingsLength : 0;
              const averageRating = parseFloat(rowRetting.toFixed(1));
              return (
                <div className="bd-populer__item" key={key}>
                  <div className="bd-populer__thumb">
                    <Link href={`/shop-details/${item._id}`}>
                      <Image
                        src={item.img}
                        alt="product-img"
                        width={50}
                        height={60}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                  </div>
                  <div className="bd-populer__info">
                    <h4 className="bd-product__title">
                      <Link href={`/shop-details/${item._id}`}>
                        {item.productName}
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
            })}
          </div>
        )}
          </>
          :
          <>
          <p className="text-center mt-3">No Popular Product Found</p>
          </>
         }
      </div>
    </div>
  );
};

export default SidebarTopratedProduct;
