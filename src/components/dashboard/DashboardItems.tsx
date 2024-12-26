"use client"
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType, PaymentInfoType, SubmissionInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import AddReview from "../shop-details/AddReview";


const DashboardItems = () => {
  const { user, header, setDynamicId, setEventDynamicId, setEventSubmission } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [submissionInfo, setSubmissionInfo] = useState<SubmissionInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<boolean>(false);
  const [product, setProduct] = useState<CartProductType[]>([]);
  const [retting, setRetting] = useState<any>({});

  // Function to fetch product rating and data
  const CheckRating = (id: string) => {
    setLoading(true);
    axios
      .get(`${process.env.BASE_URL}product/single-products/${id}`)
      .then((res) => {
        setRetting(res.data.rettingsData);
        setProduct(res.data.data);
        setLoading(false); // Set loading to false once data is fetched
        console.log(product)
        console.log(retting)
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}submission/list?email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setSubmissionInfo(res.data.data);

        }
      })
      .catch((e) => {
        // Handle error silently
      });
  }, [user?.email, header, loading]);


  return (
    <>
      {submissionInfo?.length ? (
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

                        <tbody>
                          {submissionInfo?.map((item) => (
                            <tr key={item.id}>
                              <td className="product-thumbnail">
                                <Link href={`/shop-details/${item.eventUserId}`}>
                                  <Image
                                    src={item.eventimg}
                                    width={50}
                                    height={50}
                                    alt={item.eventname}
                                    style={{ width: "auto", height: "auto" }}
                                  />
                                </Link>
                              </td>
                              <td className="product-name">
                                <Link href={`/shop-details/${item.eventUserId}`}>
                                  {item.eventname}
                                </Link>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  <button
                                    onClick={() => { setEventSubmission(item) }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Quick View"
                                    data-bs-toggle="modal"
                                    data-bs-target="#orderTrackModal"
                                    className="bd-bn__btn-2"
                                  >
                                    Upload
                                  </button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  <button className="bd-bn__btn-2"  onClick={() => { console.log(item.certificatePath)}}>Download</button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  <button className="bd-bn__btn-2">Download</button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  Review
                                  <AddReview
                                    product={item.eventUserId}
                                    setNewReview={setNewReview}
                                    newReview={newReview}
                                  />
                                    <button className="bd-bn__btn-2"  onClick={() => { CheckRating(item.eventUserId)}}>Download</button>
                                </div>
                                
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  1/1/2025
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
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
