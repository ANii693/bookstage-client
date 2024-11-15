"use client";
import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import { UserReviewType } from "@/interFace/api-interFace";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { error } from "console";

interface FormData {
  review: string;
}

const UserReviews = () => {
  const { user, header } = useGlobalContext();
  const [myReviews, setMyReviews] = useState<UserReviewType[]>([]);
  const [singleReview, setSingleReview] = useState<Record<string, any>>({});
  const [retting, setRetting] = useState<number>(0);
  const [edeteActive, setEdeteActive] = useState<boolean>(false);
  const [updateReview, setupdateReview] = useState<boolean>(false);
  const [edetedId, setEdetedId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const rettings = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${process.env.BASE_URL}user-input/client-review?email=${user?.email}`
        )
        .then((res) => {
          setMyReviews(res.data);
        })
        .catch((e) => {});
    }
  }, [user?.email, updateReview]);

  const handleDeleteReview = (item: UserReviewType) => {
    const url = `${process.env.BASE_URL}user-input/delete-review?email=${user?.email}`;

    const deleteReview = async () => {
      try {
        const response = await axios.delete(url, {
          ...header,
          data: item,
        });
        if (response.data.message === "success") {
          const remainingReviews = myReviews.filter(
            (itm) => itm._id !== item?._id
          );
          setMyReviews(remainingReviews);
          toast.success("Review Deleted");
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          console.error(
            "Unauthorized access"
          );
        } else {
          console.error("Unauthorized access");
        }
      }
    };

    deleteReview();
  };

  const handleActiveEdete = (item: UserReviewType) => {
    setEdeteActive(!edeteActive);
    setEdetedId(item?._id);
    setSingleReview(item);
  };

  const handleResetEdete = () => {
    setEdeteActive(!edeteActive);
    setRetting(0);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const review = data.review ? data.review : singleReview?.review;
    const newretting = retting ? retting : singleReview?.retting;
    const reviewInfoData = {
      id: singleReview?._id,
      productId: singleReview?.productId,
      email: singleReview?.email,
      review,
      retting:newretting,
      oldRatting: singleReview?.retting,
    };

    axios
      .put(`${process.env.BASE_URL}user-input/update-review?email=${user?.email}`, reviewInfoData, header)
      .then((res) => {
        if (res.data.message === "success") {
          setEdeteActive(!edeteActive);
          setRetting(0);
          setupdateReview(!updateReview);
          toast.success(`Review Updated`);
        }
      })
     .catch((error)=>{
        if (error.response.status === 403) {
          console.error(
            "Unauthorized access"
          );
        } else {
          console.error("Unauthorized access");
        }
      })
  };

  return (
    <>
      {myReviews.length ? (
        <div className={`student-profile-reviews ${myReviews.length > 4 ? "scrollbox" : ""}`}>
          {myReviews.map((item) => (
            <div key={item._id} className="student-profile-reviews-item mb-30">
              <div className="student-profile-reviews-course-title">
                <h5>
                  {" "}
                  <Link href={`/shop-details/${item?.productId}`}>
                    {item?.productName
                      ? item?.productName
                      : "Product Name Not Set"}
                  </Link>{" "}
                </h5>
              </div>
              {edeteActive && item._id === edetedId ? (
                <>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="student-profile-reviews-text"
                  >
                    <div className="student-profile-reviews-text-wrap mb-20">
                      {retting === 0 ? (
                        <>
                          <div className="student-profile-review-icon d-flex">
                            {rettings.map((item) => (
                              <li
                                onClick={() => setRetting(item.id)}
                                key={item.id}
                              >
                                <span>
                                  <i className="fal fa-star"></i>
                                </span>
                              </li>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="student-profile-review-icon">
                            <GetRatting averageRating={retting} />
                          </div>
                        </>
                      )}

                      <div className="student-profile-review-update">
                        <button
                          onClick={() => handleActiveEdete(item)}
                          type="button"
                          className="student-profile-review-update-btn"
                        >
                          <i className="far fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(item)}
                          type="button"
                          className="student-profile-review-update-btn"
                        >
                          <i className="far fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>

                    <div className="contact-from-input mb-20">
                      <label htmlFor="Current">Change Review</label>
                      <input
                        id="Current"
                        type="text"
                        placeholder="Type New Review"
                        defaultValue={item?.review}
                        {...register("review")}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="cont-btn mb-20  mt-10">
                          <button type="submit" className="update-close-btn">
                            Update Review
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="cont-btn mb-20  mt-10">
                          <button
                            onClick={handleResetEdete}
                            className="update-close-btn"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="student-profile-reviews-text">
                    <div className="student-profile-reviews-text-wrap mb-20">
                      <div className="student-profile-review-icon">
                        <GetRatting averageRating={item?.retting} />
                      </div>
                      <div className="student-profile-review-update d-flex">
                        <button
                          onClick={() => handleActiveEdete(item)}
                          type="button"
                          className="student-profile-review-update-btn"
                        >
                          <i className="far fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(item)}
                          type="button"
                          className="student-profile-review-update-btn"
                        >
                          <i className="far fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                    <div className="student-profile-review-content">
                      <p>{item?.review}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center">No Reviews </p>
        </>
      )}
    </>
  );
};

export default UserReviews;
