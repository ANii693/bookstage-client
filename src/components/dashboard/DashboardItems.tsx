"use client";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType, PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import AddReview from "../shop-details/AddReview";

const DashboardItems = () => {
  const { user, header, setDynamicId } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<boolean>(false);
  const [product, setProduct] = useState<CartProductType[]>([]);
  const [retting, setRetting] = useState<any>({});

  // Function to fetch product rating and data
  const CheckRating = (id: string) => {
    useEffect(() => {
      axios
        .get(`${process.env.BASE_URL}product/single-products/${id}`)
        .then((res) => {
          setRetting(res.data.rettingsData);
          setProduct(res.data.data);
        })
        .catch((e) => console.log(e));
    }, [id]); // Use only id in dependencies
  };

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
      .catch((e) => {
        // Handle error silently
      });
  }, [user?.email, header, loading]);

  const handleCancelOrder = (item: PaymentInfoType, itm: any) => {
    setLoading(false);
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
          toast.success("Order Canceled. Wait For Admin Response");
        }
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.error("Error canceling order:", error);
      });
  };

  let totalCardSum = 0;

  return (
    <>
      {paymentInfo?.length ? (
        <>
          <div className="table-responsive">
            <section className="cart-area pt-10 pb-10">
              <div className="container small-container">
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Event</th>
                            <th className="product-quantity">Upload Video</th>
                            <th className="product-quantity">Download Certificate</th>
                            <th className="product-quantity">Feedback Report</th>
                            <th className="product-quantity">Review</th>
                            <th className="product-quantity">Last Date To Submission</th>
                          </tr>
                        </thead>

                        {paymentInfo?.map((item) => (
                          <tbody key={item._id}>
                            {item?.orderProducts.map((itm: any, index: any) => {
                              totalCardSum = item?.orderProducts.reduce(
                                (sum: any, item: any) => sum + item.totalCard,
                                0
                              );

                              return (
                                <tr key={itm._id}>
                                  <td className="product-thumbnail">
                                    <Link href={`/shop-details/${itm.productId}`}>
                                      <Image
                                        src={itm.img}
                                        width={50}
                                        height={50}
                                        alt={itm.productName}
                                        style={{ width: "auto", height: "auto" }}
                                      />
                                    </Link>
                                  </td>
                                  <td className="product-name">
                                    <Link href={`/shop-details/${itm._id}`}>
                                      {itm.productName}
                                    </Link>
                                  </td>

                                  <td className="product-subtotal">
                                    <div className="bd-banner__btn">
                                      <button
                                        onClick={() => setDynamicId(item?._id)}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Quick View"
                                        data-bs-toggle="modal"
                                        data-bs-target="#orderTrackModal"
                                        className="bd-bn__btn-2"
                                      >
                                        {item?.shipmentStatus === "Delivered"
                                          ? "Uploaded"
                                          : "Upload"}
                                      </button>
                                    </div>
                                  </td>

                                  <td className="product-subtotal">
                                    <div className="bd-banner__btn">
                                      <button className="bd-bn__btn-2">Download</button>
                                    </div>
                                  </td>

                                  <td className="product-subtotal">
                                    <div className="bd-banner__btn">
                                      <button className="bd-bn__btn-2">Download</button>
                                    </div>
                                  </td>

                                  <td className="product-subtotal">
                                    <div className="bd-banner__btn">
                                      {/* Moved inside JSX */}
                                      Review
                                      <AddReview
                                        product={itm.productId}
                                        setNewReview={setNewReview}
                                        newReview={newReview}
                                      />
                                    </div>
                                  </td>

                                  <td className="product-subtotal">
                                    <div className="bd-banner__btn">
                                      1/1/2025
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Order lists */}
          </div>
        </>
      ) : (
        <p className="text-center">No Purchased Products</p>
      )}
    </>
  );
};

export default DashboardItems;
