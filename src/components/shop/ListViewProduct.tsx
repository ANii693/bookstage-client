import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType } from "@/interFace/interFace";
import { cart_product } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ListViewProduct = ({ products, limit }: any) => {
  const { openModal, setOpenModal, setModalId } = useGlobalContext();
  const dispatch = useDispatch();

  const handleAddToCart = (product: CartProductType) => {
    dispatch(cart_product(product));
  };
  const handleAddToWishlist = (product: CartProductType) => {
    dispatch(wishlist_product(product));
  };

  const handleMoldalData = (id: string) => {
    if (id) {
      setOpenModal(!openModal);
      setModalId(id);
    }
  };
  return (
    <>
      {products?.length ? (
        <>
          {products.slice(0, limit).map((item: any, index: number) => {
            const sum = item?.rettings?.reduce(
              (acc: number, currentValue: number) => acc + currentValue,
              0
            );

            const rettingsLength = item?.rettings?.length;
            const rowRetting = rettingsLength > 0 ? sum / rettingsLength : 0;
            const averageRating = parseFloat(rowRetting.toFixed(1));
            return (
              <div className="bd-grid__singel-item mb-30" key={index}>
                <div className="row align-items-center">
                  <div className="col-xxl-4 col-lg-6 col-md-6">
                    <div className="bd-trending__item">
                      <div className="bd-trending__product-thumb text-center">
                        <Link href={`/shop-details/${item?._id}`}>
                          <Image
                            src={item?.img}
                            alt="product-img"
                            width={500}
                            height={500}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-8 col-lg-6 col-md-6">
                    <div className="bd-teanding__content mb-25">
                      <div className="bd-product__content mb-10">
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
                          <GetRatting averageRating={averageRating} />
                        </div>
                      </div>
                      <p className="mb-25">
                        {item?.productDetails.slice(0, 220)}
                      </p>
 
                      {item?.productQuantity > 0 ? (
                        <>
                          <div className="bd-product__action-btn">
                            <span
                              className="cart-btn bd-add__cart-btn"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Quick Shop"
                              onClick={() => handleAddToCart(item)}
                            >
                              <i className="fal fa-cart-arrow-down"></i>
                            </span>

                            <span
                              className="bd-cart__btn bd-add__cart-btn"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#productmodal"
                              onClick={() => handleMoldalData(item?._id)}
                            >
                              <i className="fal fa-eye"></i>
                            </span>

                            <span
                              className="wishlist-btn bd-add__cart-btn"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Quick Wishlist"
                              onClick={() => handleAddToWishlist(item)}
                            >
                              <i className="fal fa-heart"></i>
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bd-product__action-btn">
                            <span
                              className="bd-cart__btn bd-add__cart-btn"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#productmodal"
                              onClick={() => handleMoldalData(item?._id)}
                            >
                              <i className="fal fa-eye"></i>
                            </span>
                            <span className="text-danger">This Product Is Out Of Stock</span>
                          </div>
                        </>
                      )}
                    </div>
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

export default ListViewProduct;
