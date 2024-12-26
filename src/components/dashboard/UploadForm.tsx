"use client";

import { getClass, getLineActiveClass } from "@/hooks/condition-class";
import useGlobalContext from "@/hooks/use-context";
import { PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import React, { useState, useEffect } from "react";

const UploadForm = () => {
  const { dynamicId } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dynamicId) {
      axios
        .get(`${process.env.BASE_URL}success/client-order-track/${dynamicId}`)
        .then((res) => {
          setPaymentInfo(res.data.products);
        })
        .catch((error) => {
          console.error("Error fetching payment info:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [dynamicId]);

  return (
    <div
      className="product__modal-sm modal fade"
      id="UploadForm"
      tabIndex={-1}
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
                {loading ? (
                  <p>Loading...</p>
                ) : paymentInfo.length ? (
                  <ul>
                    {paymentInfo.map((item, index) => (
                      <li key={index}>Product</li>
                    ))}
                  </ul>
                ) : (
                  <p>No products found</p>
                )}
                <div>Upload Form</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
