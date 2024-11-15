"use client";
import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Define your form data interface
interface FormData {
  review: string;
}

const AddReview = ({ product, setnewReview, newReview }: any) => {
  const [purchase, setPurchase] = useState([]);
  const [retting, setRetting] = useState<number>(0);
  const { user,header } = useGlobalContext();

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/percess-client-info?email=${user?.email}`
      )
      .then((res) => {
        setPurchase(res.data.clients);
      })
      .catch((e) => console.log(e));
  }, [user?.email]);

  const reviewAccess: any = purchase.find(
    (item: any) => item?._id === product?._id
  );
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const review = data.review;
    const reviewInfoWithUser = {
      productName:product?.productName,
      review,
      name: user?.name,
      email: user?.email,
      date,
      productId: product?._id,
      categoryName: product?.categoryName,
      retting,
      img:user?.photo
    };

    axios
      .post(`${process.env.BASE_URL}user-input/add-review?email=${user?.email}`, reviewInfoWithUser, header)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success(`Review Added`);
          reset();
          setnewReview(!newReview);
          setRetting(0);
        }
        if (res.data.message === "custom error") {
          toast.error(`Something Is Wrong`);
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
      <div className="product__details-comment ">
        {reviewAccess && reviewAccess?._id === product?._id ? (
          <>
            <div className="comment-title mb-20">
              <h3>Add review & rating</h3>
            </div>
            <div className="comment-rating mb-20">
              <span>give ratings</span>
              <ul>
                {retting === 0 ? (
                  <>
                    {rettings.map((item) => (
                      <li onClick={() => setRetting(item.id)} key={item.id}>
                        <span>
                          <i className="fal fa-star"></i>
                        </span>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li>
                      <span>
                        <GetRatting averageRating={retting} />
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="comment-input-box mb-20">
              <form onSubmit={handleSubmit(onSubmit)} action="#">
                <div className="row">
                  <div className="col-xxl-12">
                    <textarea
                      placeholder="Your review"
                      className="comment-input comment-textarea mb-20"
                      {...register("review", {
                        required: "Review is required",
                      })}
                    />

                    {errors.review && <span>{errors.review.message}</span>}
                  </div>

                  <div className="col-xxl-12">
                    <div className="comment-submit">
                      <button type="submit" className="bd-fill__btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AddReview;
