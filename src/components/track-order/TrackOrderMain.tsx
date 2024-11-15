"use client";
import React, { useState } from "react";
import { PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import { getClass, getLineActiveClass } from "@/hooks/condition-class";
import DeliveredDateHook from "@/hooks/DelivariedDateHook";

const TrackOrderMain = () => {
  const [searchValue, setSearchValue] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`${process.env.BASE_URL}success/track-order/${searchValue}`)
      .then((res) => {
        if (res.data.message === "No products found for the given ID") {
          setPaymentInfo([]);
          setErrorMessage(res.data.message);
        }
        if (res.data.message === "success") {
          setPaymentInfo(res.data.data);
        }
        if (res.data.message === "Internal Server Error") {
          setPaymentInfo([]);
          setErrorMessage(res.data.message);
        }
      })
      .catch((e) => {});
  };

  let totalCardSum = 0;
  return (
    <>
      <div className="container">
        <div
          className={`tracking-search-wrapper mt-5 ${
            paymentInfo?.length ? "" : "dynamic-margin"
          }`}
        >
          <div className="form-tracking">
            <form onSubmit={handleSubmit}>
              <div className="d-flex tracking-wrapper">
                <div className="form-group box-input">
                  <input
                    className="form-control"
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Enter Here Your Order Id"
                  />
                </div>
                <div className="form-group box-button">
                  <button className="btn btn-buy font-md-bold" type="submit">
                    Tracking Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {paymentInfo?.length ? (
          <>
            <div className="">
              {paymentInfo?.map((item) => (
                <>
                  {item?.orderProducts.length ? (
                    <>
                      <div key={item?._id}>
                        <div >
                          <p className="text-capitalize"> <strong>Name</strong> : {item?.name} </p>
                          <p> <strong>Order Id</strong> : {item?.orderId}</p>
                          <p> <strong>Order Date</strong> : <CustomDateFormatter inputDate={item?.date as string}/></p>
                          <p> <strong>Email</strong> : {item?.buyerEmail} </p>
                          {item?.shipmentStatus === "Delivered" ? (
                            <>
                              <p>
                                <strong>Delivered Date</strong> : 
                                <CustomDateFormatter
                                  inputDate={item?.orderStatusDate as string}
                                />
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                <strong>Estimate Delivery Date</strong> : 
                                <DeliveredDateHook
                                  inputDate={item?.orderStatusDate as string}
                                />
                              </p>
                            </>
                          )}
                          <p>
                            <strong>Shiping Address</strong> : {item?.City}, {item?.Address}{" "}
                          </p>
                        </div>

                        <div className="table-responsive">
                          <div>
                            <div className="list-steps">
                              {item?.shipmentStatus == "pending" && (
                                <>
                                  {" "}
                                  <div className="item-step line-active">
                                    <div className="rounded-step">
                                      <div className="icon-step step-1 active"></div>
                                      <h6 className="mb-1">Pending</h6>
                                      <p className="font-md color-gray-500">
                                        <CustomDateFormatter
                                          inputDate={item?.date as string}
                                        />
                                      </p>
                                    </div>
                                  </div>{" "}
                                </>
                              )}
                              {item?.shipmentStatusArray?.map((itm, index) => {
                                const dynamicClass = getClass(
                                  itm?.shipmentStatus as string
                                );
                                const dynamicLineClass = getLineActiveClass(
                                  itm?.shipmentStatus as string
                                );
                                return (
                                  <div
                                    key={index}
                                    className={`item-step ${dynamicLineClass}`}
                                  >
                                    <div className="rounded-step">
                                      <div
                                        className={`icon-step ${dynamicClass}`}
                                      ></div>
                                      <h6 className="mb-1">
                                        {" "}
                                        {itm?.shipmentStatus}{" "}
                                      </h6>
                                      <p className="font-md color-gray-500">
                                        <CustomDateFormatter
                                          inputDate={
                                            itm?.orderStatusDate as string
                                          }
                                        />
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <section className="cart-area pt-10 pb-10">
                          <div className="container">
                            <div className="row">
                              <div className="col-12">
                                <div className="table-content table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th className="product-thumbnail">
                                          Images
                                        </th>
                                        <th className="cart-product-name">
                                          Product
                                        </th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">
                                          Quantity
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item?.orderProducts.map(
                                        (itm: any, index: any, array: any) => {
                                          totalCardSum = array.reduce(
                                            (sum: any, item: any) =>
                                              sum + item.totalCard,
                                            0
                                          );

                                          return (
                                            <tr key={index}>
                                              <td className="product-thumbnail">
                                                <Link
                                                  href={`/shop-details/${itm.productId}`}
                                                >
                                                  <Image
                                                    src={itm.img}
                                                    width={50}
                                                    height={50}
                                                    style={{
                                                      width: "auto",
                                                      height: "auto",
                                                    }}
                                                    alt=""
                                                  />
                                                </Link>
                                              </td>
                                              <td className="product-name">
                                                <Link
                                                  href={`/shop-details/${itm._id}`}
                                                >
                                                  {itm.productName}
                                                </Link>
                                              </td>

                                              <td className="product-subtotal">
                                                <span className="amount">
                                                  ${itm.totalCard * itm.price}
                                                </span>
                                              </td>
                                              <td className="product-subtotal">
                                                <span className="amount">
                                                  {itm.totalCard}
                                                </span>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                      <tr>
                                        <td></td>
                                        <td className="product-name">
                                          Total Amount
                                        </td>

                                        <td className="product-subtotal">
                                          <span className="amount">
                                            ${item?.totalPrice}
                                          </span>
                                        </td>
                                        <td className="product-subtotal">
                                          <span className="amount">
                                            {totalCardSum}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
              {/* order lists */}
            </div>
          </>
        ) : (
          <>
            <p className="text-center"> {errorMessage} </p>
          </>
        )}
      </div>
    </>
  );
};

export default TrackOrderMain;
