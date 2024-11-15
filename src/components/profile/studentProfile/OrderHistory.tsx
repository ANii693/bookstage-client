"use client";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import { PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
const OrderHistory = () => {
  const { user, header, setDynamicId } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/payment-info?email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setPaymentInfo(res.data.data);
        }
      })
      .catch((e) => {});
  }, [user?.email, header, loading]);

  const handleCancelOrder = (item: PaymentInfoType, itm: any) => {
    setLoading(false)
    const now = moment();
    const date = now.format("MM/DD/YY hh:mm a");
    const orderCancelInfo = {
      id: item?._id,
      buyerEmail: user?.email,
      EmailAddress: item?.EmailAddress,
      orderProduct: itm,
      date: date,
      paymentId: item?.paymentId,
      orderId: item?.orderId,
      Phone: item?.Phone,
    };
    axios
      .put(
        `${process.env.BASE_URL}success/client-order-cencel?email=${user?.email}`,
        orderCancelInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "Order Canceled") {
          setLoading(true);
          toast.success("Order Canceled Wait For Admin Response")
        }
        setLoading(true);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.error("Unauthorized access");
          setLoading(true);
        } else {
          console.error("Unauthorized access");
          setLoading(true);
        }
      });

    //
  };

  let totalCardSum = 0;
  return (
    <>
      {paymentInfo?.length ? (
        <>
          <div className="table-responsive">
            {paymentInfo?.map((item) => (
              <>
                {item?.orderProducts.length ? (
                  <>
                    <div key={item?._id}>
                      <p> <strong>Order Id</strong> : {item?.orderId}</p>
                      <p>
                        <strong>Order Date</strong> :{" "}
                        <CustomDateFormatter inputDate={item?.date as string} />{" "}
                      </p>
                      
                      {
                        item?.shipmentStatus === "Delivered" ?
                        <>
                        <p>
                        <strong>Delivere Date</strong> :{" "}
                        <CustomDateFormatter inputDate={item?.orderStatusDate as string} />{" "}
                      </p>
                        </>
                        :
                        <>
                           
                        </>
                      }

                      <section className="cart-area pt-10 pb-10">
                        <div className="container small-container">
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

                                      {item?.shipmentStatus == "pending" ? (
                                        <>
                                          <th className="product-quantity">
                                            Action
                                          </th>
                                        </>
                                      ) : (
                                        <>
                                          <th className="product-quantity">
                                            Track Order
                                          </th>
                                        </>
                                      )}
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
                                            {item?.shipmentStatus ==
                                            "pending" ? (
                                              <>
                                                <td className="product-subtotal">
                                                  <span className="amount">
                                                    <div className="bd-banner__btn">
                                                      <button
                                                        onClick={() =>
                                                          handleCancelOrder(
                                                            item,
                                                            itm
                                                          )
                                                        }
                                                        className="bd-bn__btn-2"
                                                      >
                                                        Cancel Order
                                                      </button>
                                                    </div>
                                                  </span>
                                                </td>
                                              </>
                                            ) : (
                                              <>
                                                <td className="product-subtotal">
                                                  <div className="bd-banner__btn">
                                                    <button
                                                      onClick={() =>
                                                        setDynamicId(item?._id)
                                                      }
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title="Quick View"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#orderTrackModal"
                                                      className="bd-bn__btn-2"
                                                    >
                                                      {item?.shipmentStatus ==
                                                      "Delivered"
                                                        ? "Delivered"
                                                        : "View Order Status"}
                                                    </button>
                                                  </div>
                                                </td>
                                              </>
                                            )}
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
                    <hr />
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
          <p className="text-center">No Purches Product </p>
        </>
      )}
    </>
  );
};

export default OrderHistory;
