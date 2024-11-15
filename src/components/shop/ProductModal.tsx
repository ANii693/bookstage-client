"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Controller, Navigation } from "swiper";
import "swiper/css/bundle";
import useGlobalContext from "@/hooks/use-context";
import Image from "next/image";
import { cart_product, decrease_quantity } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import { CartProductType } from "@/interFace/interFace";
import axios from "axios";
import discover from "../../../public/assets/img/icon/discover.png";
import masterCard from "../../../public/assets/img/icon/mastercard.png";
import papyle from "../../../public/assets/img/icon/paypal.png";
import visa from "../../../public/assets/img/icon/visa.png";
import GetRatting from "@/hooks/GetRatting";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const ProductModal = () => {
  const { modalId } = useGlobalContext();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [product, setProduct] = useState<CartProductType[]>([]);
  const [retting, setRetting] = useState<any>({});
  const myProduct: CartProductType = product[0];
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const quantity = cartProducts.find((item) => item?._id === myProduct?._id);
  const totalCart = quantity?.totalCard;

  useEffect(() => {
    if (modalId !== "") {
      axios
        .get(`${process.env.BASE_URL}product/single-products/${modalId}`)
        .then((res) => {
          setRetting(res.data.rettingsData);
          setProduct(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [modalId]);

  const handleAddToCart = (product: CartProductType) => {
    dispatch(cart_product(product));
  };

  const handDecressCart = (product: CartProductType) => {
    dispatch(decrease_quantity(product));
  };
  const handleChange = (e: any) => {};
  const dispatch = useDispatch();
  return (
    <div
      className="product__modal-sm modal fade"
      id="productmodal"
      //   tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="product__modal">
            <div className="product__modal-wrapper p-relative">
              <button
                type="button"
                className="close product__modal-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fal fa-times"></i>
              </button>
              <div className="modal__inner">
                <div className="bd__shop-details-inner">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="product-details__thumb-inner p-relative">
                        <div className="bd__shop-details-img-gallery mb-30">
                          <div className="product-details-active swiper-container">
                            <div className="swiper-wrappers">
                              <Swiper
                                thumbs={{ swiper: thumbsSwiper }}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={1}
                                freeMode={false}
                                watchSlidesProgress={true}
                                modules={[
                                  Navigation,
                                  Controller,
                                  FreeMode,
                                  Thumbs,
                                ]}
                                navigation={{
                                  nextEl: ".product-details__button-next",
                                  prevEl: ".product-details__button-prev",
                                }}
                              >
                                {myProduct &&
                                  myProduct?.productImages?.map(
                                    (item: any, index: any) => {
                                      return (
                                        <SwiperSlide key={index}>
                                          <div className="swiper-slides">
                                            <div className="bd-product__details-large-img w-img">
                                              <Image
                                                src={item}
                                                alt="product-details-img"
                                                width={450}
                                                height={450}
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </SwiperSlide>
                                      );
                                    }
                                  )}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                        <div className="bd-product__details-small-img">
                          <div className="swiper-container product-details-nav">
                            <div className="swiper-wrappers">
                              <Swiper
                                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={4}
                                modules={[Controller, FreeMode, Thumbs]}
                                watchSlidesProgress={false}
                              >
                                {myProduct &&
                                  myProduct?.productImages?.map(
                                    (item: any, index: any) => (
                                      <SwiperSlide key={index}>
                                        <div className="swiper-slides m-img">
                                          <div className={`product-small__img`}>
                                            <Image
                                              src={item}
                                              alt="product-details-img"
                                              width={70}
                                              height={70}
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </SwiperSlide>
                                    )
                                  )}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="modal-product-info modal-product__details-content">
                        <div className="product-ratting">
                          <ul>
                            <li>
                              <a href="#">
                                <GetRatting
                                  averageRating={retting.averageRating}
                                />
                              </a>
                            </li>

                            <li className="review-total">
                              {" "}
                              <a href="#">
                                {" "}
                                ({" "}
                                {`${retting.rettings} ${
                                  retting.rettings <= 1 ? "Rating" : "Ratings"
                                }`}{" "}
                                )
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h3>{myProduct?.productName}</h3>
                        <div className="product-price">
                          <span>
                            $
                            {myProduct?.price % 1 === 0
                              ? `${myProduct?.price}.00`
                              : myProduct?.price.toFixed(2)}
                          </span>
                          {myProduct?.offer === true ? (
                            <del>
                              {`$${
                                myProduct?.oldPrice % 1 === 0
                                  ? `${myProduct?.oldPrice}.00`
                                  : myProduct?.oldPrice.toFixed(2)
                              }`}
                            </del>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="modal-product-meta bd__product-details-menu-1">
                          <ul>
                            <li>
                              <strong>Products:</strong>
                              {myProduct?.productQuantity > 0 && <span> {myProduct?.productQuantity} Pieces Available </span>}
                            </li>
                          </ul>
                        </div>
                        <div className="product-quantity-cart mb-25">
                          {myProduct?.productQuantity > 0 ? (
                            <>
                              {" "}
                              <div className="product-quantity-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <button
                                    onClick={() => handDecressCart(myProduct)}
                                    className="cart-minus"
                                  >
                                    <i className="far fa-minus"></i>
                                  </button>
                                  <input
                                    className="cart-input"
                                    type="text"
                                    readOnly
                                    value={totalCart ? totalCart : 0}
                                  />
                                  <button
                                    className="cart-plus"
                                    onClick={() => handleAddToCart(myProduct)}
                                  >
                                    <i className="far fa-plus"></i>
                                  </button>
                                </form>
                              </div>
                              <span data-bs-dismiss="modal" aria-label="Close">
                                <Link
                                  className="cart-btn bd-fill__btn"
                                  href="/cart"
                                >
                                  <i className="fal fa-cart-arrow-down"></i>{" "}
                                  View Cart
                                </Link>
                              </span>{" "}
                            </>
                          ) : (
                            <>
                              <span className="text-danger">
                                This Product Is Out Of Stock
                              </span>
                            </>
                          )}
                        </div>

                        {myProduct?.productQuantity > 0 ? (
                          <>
                            <div className="bd__product-details-menu-3">
                              <ul>
                                <li>
                                  <span
                                    className="wishlist-btn"
                                    title="Wishlist"
                                    onClick={() =>
                                      dispatch(wishlist_product(myProduct))
                                    }
                                  >
                                    <i className="far fa-heart"></i>
                                    <span>Add to Wishlist</span>
                                  </span>
                                </li>
                                <li>
                                  <span
                                    className="wishlist-btn cart-btn"
                                    title="Compare"
                                  >
                                    <i className="fas fa-exchange-alt"></i>
                                    <span>Compare</span>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        <div className="bd__social-media">
                          <ul>
                            <li>Share:</li>
                            <li>
                              <Link
                                href="https://www.facebook.com/"
                                target="_blank"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://twitter.com/?lang=en"
                                title="Twitter"
                              >
                                <i className="fab fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://www.linkedin.com/"
                                title="Linkedin"
                                target="_blank"
                              >
                                <i className="fab fa-linkedin"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://www.instagram.com/"
                                target="_blank"
                                title="Instagram"
                              >
                                <i className="fab fa-instagram"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="bd__safe-checkout">
                          <h5>Guaranteed Safe Checkout</h5>
                          <a href="#">
                            <Image src={discover} alt="Payment Image" />
                          </a>
                          <a href="#">
                            <Image src={masterCard} alt="Payment Image" />
                          </a>
                          <a href="#">
                            <Image src={papyle} alt="Payment Image" />
                          </a>
                          <a href="#">
                            <Image src={visa} alt="Payment Image" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
