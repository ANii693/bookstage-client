"use client";
import React, { useEffect, useState } from "react";
import AddReview from "./AddReview";
import axios from "axios";
import { UserReviewType } from "@/interFace/api-interFace";
import GetRatting from "@/hooks/GetRatting";
import Image from "next/image";
import userIcon from "../../../public/assets/img/icon/user-icon.png";
import Link from "next/link";
const ShopDetailsReview = ({ product, newReview, setnewReview }: any) => {
  const [reviews, setReviews] = useState<UserReviewType[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}user-input/reviews?id=${product?._id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((e) => console.log(e));
  }, [product?._id, newReview]);

  return (
    <>
      <div className="product_info-faq-area pt-50">
        <nav className="product-details-tab">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link
              className="nav-item nav-link show"
              id="nav-general-tab"
              data-bs-toggle="tab"
              href="#nav-general"
              role="tab"
              aria-selected="false"
            >
              Description
            </Link>
            <Link
              className="nav-item nav-link active"
              id="nav-seller-tab"
              data-bs-toggle="tab"
              href="#nav-seller"
              role="tab"
              aria-selected="true"
            >
              Reviews
            </Link>
          </div>
        </nav>
        <div
          className="tab-content product-details-content"
          id="nav-tabContent"
        >
          <div className="tab-pane fade" id="nav-general" role="tabpanel">
            <div className="tabs-wrapper mt-35">
              <div className="product__details-des">
                <p> {product?.productDetails} </p>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade active show"
            id="nav-seller"
            role="tabpanel"
          >
            <div className={`tabs-wrapper mt-35 mb-50 ${reviews.length> 4 ? "scrollbox" : ""}`}>
              {reviews.length ? (
                <div className="scrollbox">
                  {reviews.map((item) => (
                    <div key={item._id} className={`course-review-item mb-30`}>
                      <div className="course-reviews-img">
                        {item?.img ? (
                          <>
                            <Link href="#">
                              <Image
                                src={item?.img}
                                alt="image not found"
                                width={200}
                                height={200}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href="#">
                              <Image
                                width={200}
                                height={200}
                                style={{ width: "auto", height: "auto" }}
                                src={userIcon}
                                alt="image not found"
                              />
                            </Link>
                          </>
                        )}
                      </div>
                      <div className="course-review-list">
                        <h5>
                          <Link href="#"> {item.name} </Link>
                        </h5>
                        <div className="course-start-icon">
                          <GetRatting averageRating={item.retting} />
                          <span> {item.date} </span>
                        </div>
                        <p> {item.review} </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p> No Review For This Product</p>
                </>
              )}

              <AddReview
                setnewReview={setnewReview}
                newReview={newReview}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetailsReview;
