"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { A11y, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartProductType } from "@/interFace/interFace";
import { useDispatch } from "react-redux";
import { cart_product } from "@/redux/slices/cartSlice";
import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import ProductModal from "@/components/shop/ProductModal";
import ShopPreloader from "@/preloaders/ShopPreloader";
const TrendingProductSlider = ({ trending_product_title }: any) => {
  const { setOpenModal, setModalId, openModal } = useGlobalContext();
  const dispatch = useDispatch();
  const [Products, setProducts] = useState<CartProductType[]>([]);
  const [apiEndPoint, setapiEndPoint] = useState<string>(" ");
  const [tabProduct, setTabProduct] = useState<CartProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const menuData = [
    {
      id: 1,
      text: "New Arrival",
      api: "new-arrival",
    },
    {
      id: 2,
      text: "Best Sale",
      api: "best-selling-products",
    },
    {
      id: 3,
      text: "Trending",
      api: "trending-products",
    },
  ];

  const handleMoldalData = (id: string) => {
    if (id) {
      setOpenModal(!openModal);
      setModalId(id);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/trending-products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}product/${apiEndPoint}`
        );
        setTabProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiEndPoint, setTabProduct]);

  const handleCallApi = () => {
    router.push("/shop");
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-4 col-xl-5 col-lg-4">
          <div className="bd-section__title-wrapper mb-40">
            <div className="bd-sm__section-title">
              <h3>
                {trending_product_title
                  ? trending_product_title
                  : "You May Missed"}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-xxl-8 col-xl-7 col-lg-8">
          <div className="bd-trending__tab-wrapper mb-40 p-relative">
            <div className="bd-tending-nav">
              <nav>
                <div className="nav nav-tabs">
                  <button
                    className={
                      apiEndPoint === " " ? "nav-link active" : "nav-link"
                    }
                    onClick={handleCallApi}
                  >
                    View All
                  </button>
                  {menuData.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setapiEndPoint(item.api)}
                      className={
                        item.api === apiEndPoint
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            <div className="bd-trending__navigation">
              <button className="trending-button-preva">
                <i className="fa-regular fa-angle-left"></i>
              </button>
              <button className="trending-button-nexta">
                <i className="fa-regular fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-trending__item-wrapper">
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active">
            <div className="bd-trending-active">
              <div className="swiper-wrappers">
                <Swiper
                  modules={[Navigation, A11y, Autoplay]}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  navigation={{
                    nextEl: ".trending-button-nexta",
                    prevEl: ".trending-button-preva",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    500: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                    1400: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {tabProduct.length ? (
                    <>
                      {loading ? (
                        <>
                          <ShopPreloader end={1} />
                        </>
                      ) : (
                        <>
                          {tabProduct?.length ? (
                            tabProduct?.map((item, index) => {
                              const sum = item?.rettings.reduce(
                                (acc: number, currentValue: number) =>
                                  acc + currentValue,
                                0
                              );

                              const rettingsLength = item?.rettings?.length;
                              const rowRetting =
                                rettingsLength > 0 ? sum / rettingsLength : 0;
                              const averageRating = parseFloat(
                                rowRetting.toFixed(1)
                              );
                              return (
                                <SwiperSlide key={index}>
                                  <div className="swiper-slides">
                                    <div className="bd-trending__item text-center mb-30">
                                      <div className="bd-trending__product-thumb">
                                        <Link
                                          href={`/shop-details/${item?._id}`}
                                        >
                                          <Image
                                            width={500}
                                            height={500}
                                            style={{
                                              width: "100%",
                                              height: "auto",
                                            }}
                                            src={item?.img}
                                            alt="product-img"
                                          />
                                        </Link>
                                        {item?.productQuantity > 0 ? (
                                          <>
                                            <div className="bd-product__action">
                                              <span
                                                className="cart-btn"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Quick Shop"
                                                onClick={() =>
                                                  dispatch(cart_product(item))
                                                }
                                              >
                                                <i className="fal fa-cart-arrow-down"></i>
                                              </span>
                                              <span
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Quick View"
                                                data-bs-toggle="modal"
                                                data-bs-target="#productmodal"
                                                onClick={() =>
                                                  handleMoldalData(item?._id)
                                                }
                                              >
                                                <i className="fal fa-eye"></i>
                                              </span>
                                              <span
                                                className="wishlist-btn"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Quick Wishlist"
                                                onClick={() =>
                                                  dispatch(
                                                    wishlist_product(item)
                                                  )
                                                }
                                              >
                                                <i className="fal fa-heart"></i>
                                              </span>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className="bd-product__action">
                                              <span
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Quick View"
                                                data-bs-toggle="modal"
                                                data-bs-target="#productmodal"
                                                onClick={() =>
                                                  handleMoldalData(item?._id)
                                                }
                                              >
                                                <i className="fal fa-eye"></i>
                                              </span>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div className="bd-teanding__content">
                                        <h4 className="bd-product__title">
                                          <Link
                                            href={`/shop-details/${item?._id}`}
                                          >
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
                                            <span className="bd-product__new-price">
                                              ₹{`${item?.price}.00`}
                                            </span>
                                          ) : (
                                            <span className="bd-product__new-price">
                                              ₹{item?.price.toFixed(2)}
                                            </span>
                                          )}
                                        </div>
                                        <div className="bd-product__icon">
                                          <GetRatting
                                            averageRating={averageRating}
                                          />
                                        </div>
                                      </div>
                                      <div className="bd-product__tag">
                                        {item?.offer ? (
                                          <>
                                            <span className="tag-text danger-bg">
                                              {" "}
                                              {item?.offerPersent}%
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            {item?.productQuantity > 0 ? (
                                              <>
                                                <span className="tag-text theme-bg">
                                                  {" "}
                                                  {item?.productStatus}
                                                </span>
                                              </>
                                            ) : (
                                              <>
                                                <span className="tag-text wraning-bg">
                                                  {" "}
                                                  Stock Out
                                                </span>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            })
                          ) : (
                            <>
                              <p className="text-center"> No Product Found </p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {Products?.length ? (
                        Products?.map((item, index) => {
                          const sum = item?.rettings.reduce(
                            (acc: number, currentValue: number) =>
                              acc + currentValue,
                            0
                          );

                          const rettingsLength = item?.rettings?.length;
                          const rowRetting =
                            rettingsLength > 0 ? sum / rettingsLength : 0;
                          const averageRating = parseFloat(
                            rowRetting.toFixed(1)
                          );
                          return (
                            <SwiperSlide key={index}>
                              <div className="swiper-slides">
                                <div className="bd-trending__item text-center mb-30">
                                  <div className="bd-trending__product-thumb">
                                    <Link href={`/shop-details/${item._id}`}>
                                      <Image
                                        width={500}
                                        height={500}
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                        }}
                                        src={item?.img}
                                        alt="product-img"
                                      />
                                    </Link>
                                    {item?.productQuantity > 0 ? (
                                      <>
                                        <div className="bd-product__action">
                                          <span
                                            className="cart-btn"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Quick Shop"
                                            onClick={() =>
                                              dispatch(cart_product(item))
                                            }
                                          >
                                            <i className="fal fa-cart-arrow-down"></i>
                                          </span>
                                          <span
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Quick View"
                                            data-bs-toggle="modal"
                                            data-bs-target="#productmodal"
                                            onClick={() =>
                                              handleMoldalData(item?._id)
                                            }
                                          >
                                            <i className="fal fa-eye"></i>
                                          </span>
                                          <span
                                            className="wishlist-btn"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Quick Wishlist"
                                            onClick={() =>
                                              dispatch(wishlist_product(item))
                                            }
                                          >
                                            <i className="fal fa-heart"></i>
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="bd-product__action">
                                          <span
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Quick View"
                                            data-bs-toggle="modal"
                                            data-bs-target="#productmodal"
                                            onClick={() =>
                                              handleMoldalData(item?._id)
                                            }
                                          >
                                            <i className="fal fa-eye"></i>
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  <div className="bd-teanding__content">
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
                                        <span className="bd-product__new-price">
                                          ₹{`${item?.price}.00`}
                                        </span>
                                      ) : (
                                        <span className="bd-product__new-price">
                                          ₹{item?.price.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                    <div className="bd-product__icon">
                                      <GetRatting
                                        averageRating={averageRating}
                                      />
                                    </div>
                                  </div>
                                  <div className="bd-product__tag">
                                    {item?.offer ? (
                                      <>
                                        <span className="tag-text danger-bg">
                                          {" "}
                                          {item?.offerPersent}%
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {item?.productQuantity > 0 ? (
                                          <>
                                            <span className="tag-text theme-bg">
                                              {" "}
                                              {item?.productStatus}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span className="tag-text wraning-bg">
                                              {" "}
                                              Stock Out
                                            </span>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })
                      ) : (
                        <>
                          <p className="text-center"> No Product Found </p>
                        </>
                      )}
                    </>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal />
    </>
  );
};

export default TrendingProductSlider;
