"use client";
import useGlobalContext from "@/hooks/use-context";
import { blogDataType, dynamicIdType } from "@/interFace/api-interFace";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
 
interface FormData {
  comment: string;
}

interface blogDataInterFace {
  item: blogDataType;
}

const BlogCommentForm = ({ item }: blogDataInterFace) => {
  const { user, newComment, setNewComment, header } = useGlobalContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const comment = data.comment;
    const email = user?.email;
    const name = user?.name;
    const postId = item?._id;
    const commentInfo = {
      date,
      comment,
      email,
      name,
      postId,
      img: user?.photo ? user?.photo : "",
      title: item?.title,
    };

    axios
      .post(
        `${process.env.BASE_URL}blog/create-comment?email=${user?.email}`,
        commentInfo,
        header
      )
      .then((res) => {
        if (res.data.data.acknowledged === true) {
          reset();
          setNewComment(!newComment);
          toast.success(`comment added`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  return (
    <>
      {user?.email ? (
        <>
          <div className="bd-postbox__contact">
            <h3>Leave a Comment</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-xxl-12">
                  <div className="bd-postbox__singel-input">
                    <textarea
                      placeholder="Enter your comment ..."
                      {...register("comment", {
                        required: "Password is required",
                        minLength: {
                          value: 4,
                          message: "comment must be at least 4 characters long",
                        },
                      })}
                    ></textarea>
                  </div>
                </div>
                <div className="col-xxl-12">
                  <div className="bd-postbox__btn">
                    <button type="submit" className="bd-fill__btn">
                      Post Comment
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
    </>
  );
};

export default BlogCommentForm;
