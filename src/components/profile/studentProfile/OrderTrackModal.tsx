"use client";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import { getClass, getLineActiveClass } from "@/hooks/condition-class";
import useGlobalContext from "@/hooks/use-context";
import { PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import React, { useState, useEffect } from "react";

const OrderTrackModal = () => {
  const {dynamicId } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/client-order-track/${dynamicId}`,)
      .then((res) => {
        setPaymentInfo(res.data.products);
      })
      .catch((e) => {});
  }, [dynamicId]);
  return (
    <>
      <div
        className="product__modal-sm modal fade"
        id="orderTrackModal"
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
                <div className="modal__inner d-flex">
                  <div className="table-responsive">
                    {paymentInfo?.map((item) => (
                      <>
                        <div key={item?._id}>
                          <p>#Order Id : {item?.orderId}</p>

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
                        
                      </>
                    ))}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackModal;
