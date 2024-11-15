"use client";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CanceOrderDataType } from "@/interFace/api-interFace";
import Image from "next/image";
import Link from "next/link";
const CancelOrderTrack = () => {
  const { user, header, setDynamicId } = useGlobalContext();
  const [cancelOrderData, setCancelOrderData] = useState<CanceOrderDataType[]>(
    []
  );
  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/single-user-cancel-orders?email=${user?.email}`,
        header
      )
      .then((res) => {
        setCancelOrderData(res.data.data);
      })
      .catch((e) => {});
  }, [user?.email, header]);
  return (
    <>
      {cancelOrderData?.length ? (
        <>
          <div className="table-responsive">
            {cancelOrderData?.map((item) => (
              <>
                <div key={item?._id}>
                  <p> <strong>Order Id</strong> : {item?.orderId}</p>
                  <p>
                    <strong>Order Date</strong> :{" "}
                    <CustomDateFormatter inputDate={item?.date as string} />{" "}
                  </p>

                  <section className="cart-area pt-10 pb-10">
                    <div className="container small-container">
                      <div className="row">
                        <div className="col-12">
                          <div className="table-content table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th className="product-thumbnail">Images</th>
                                  <th className="cart-product-name">Product</th>
                                  <th className="product-price">Price</th>
                                  <th className="product-quantity">Quantity</th>

                                  <th className="product-quantity">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="product-thumbnail">
                                    <Link href="">
                                      <Image
                                        src={item?.orderProduct?.img}
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
                                    <Link href="">
                                      {item?.orderProduct?.productName}
                                    </Link>
                                  </td>

                                  <td className="product-subtotal">
                                    <span className="amount">
                                      $
                                      {item?.orderProduct?.totalCard *
                                        item?.orderProduct?.price}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      {item?.orderProduct?.totalCard}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                    {item?.returnStatus === "approved" ? "Cancelled" : "Cancel Pending"}
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
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-center">No cancelled Product </p>
        </>
      )}
    </>
  );
};

export default CancelOrderTrack;
