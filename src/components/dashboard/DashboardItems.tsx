"use client"
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType, PaymentInfoType, SubmissionInfoType } from "@/interFace/interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Loader2, Star } from 'lucide-react';

import AddReview from "../shop-details/AddReview";
import ShopDetailsMain from "../shop-details/ShopDetailsMain";

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '80rem',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem'
  },
  eventButton: {
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  activeEventButton: {
    backgroundColor: '#699C47',
    color: 'white',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#111827'
  },
  tableCell: {
    padding: '0.75rem 1rem',
    borderTop: '1px solid #e5e7eb'
  },
  submitButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s'
  },
  submittedButton: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  activeSubmitButton: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  starButton: {
    padding: '0.25rem',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    background: 'none',
    border: 'none',
    position: 'relative'
  },
  disabledStar: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  videoButton: {
    color: '#2563eb',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f3f4f6'
    }
  },
  criteriaContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #e5e7eb',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  disabledTextarea: {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed'
  }
};
const StarRating = ({
  value,
  onChange,
  disabled = false
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      setHoverValue(starIndex - (isLeftHalf ? 0.5 : 0));
    }
  };

  const handleClick = (starIndex: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      const clickedValue = starIndex - (isLeftHalf ? 0.5 : 0);
      onChange(clickedValue);
      setHoverValue(null);
    }
  };

  const renderStar = (starIndex: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isFullStar = displayValue >= starIndex;
    const isHalfStar = !isFullStar && displayValue >= starIndex - 0.5;

    return (
      <button
        key={starIndex}
        onClick={(e) => handleClick(starIndex, e)}
        onMouseMove={(e) => handleMouseMove(e, starIndex)}
        onMouseLeave={() => setHoverValue(null)}
        style={{
          ...styles.starButton,
          ...(disabled ? styles.disabledStar : {}),
          color: (isFullStar || isHalfStar) ? '#facc15' : '#d1d5db',
          position: 'relative' as 'relative',
        }}
      >
        <Star
          size={24}
          style={{
            fill: isFullStar ? 'currentColor' : 'none',
            stroke: 'currentColor'
          }}
        />
        {isHalfStar && (
          <Star
            size={24}
            style={{
              position: 'absolute',
              left: 0,
              fill: 'currentColor',
              clipPath: 'inset(0 50% 0 0)',
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};
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
                            <th className="product-quantity">Last Date To Submission</th>
                            <th className="product-quantity">Upload Video</th>
                            <th className="product-quantity">Download Certificate</th>
                            <th className="product-quantity">Feedback Report</th>
                            <th className="product-quantity">Review</th>
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
                                  1/1/2025
                                </div>
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
                                  <button className="bd-bn__btn-2" onClick={() => { console.log(item.certificatePath) }}>Download</button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  <button className="bd-bn__btn-2" onClick={() => { console.log(item.feedbackReportPath) }}>Download</button>
                                </div>
                              </td>

                              <td className="product-subtotal">
                                <div className="bd-banner__btn">
                                  <Link href={`/shop-details/${item.eventUserId}#review`}>
                                    {/* <button className="bd-bn__btn-2">Review</button> */}
                                    <div style={styles.criteriaContainer}>
                          <StarRating
                            value={0}
                            onChange={(value) => 0}
                            disabled={false}
                          />
                          <textarea
                            value={''}
                            onChange={(e) => 0}
                            disabled={true}
                            placeholder="Reason input here..."
                            rows={1}
                            // outline="green"
                            style={{
                              ...styles.textarea,
                              resize: 'vertical',
                              ...(true ? styles.disabledTextarea : {})
                            }}
                          />
                        </div>
                                  </Link>
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
