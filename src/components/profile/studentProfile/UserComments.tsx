"use client";

import useGlobalContext from "@/hooks/use-context";
import { CommentType } from "@/interFace/api-interFace";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  comment: string;
}

const UserComments = () => {
  const { user, header } = useGlobalContext();
  const [myComments, setMyComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<Record<string, any>>({});
  const [edeteActive, setEdeteActive] = useState<boolean>(false);
  const [updateComment, setupdateComment] = useState<boolean>(false);
  const [edetedId, setEdetedId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${process.env.BASE_URL}blog/user-comment?email=${user?.email}`)
        .then((res) => {
          setMyComments(res.data.data);
        })
        .catch((e) => {});
    }
  }, [user?.email, updateComment]);


  const handleDeleteReview = (item: CommentType) => {
    const url = `${process.env.BASE_URL}blog/delete-comment?email=${user?.email}`;

    const deleteReview = async () => {
      try {
        const response = await axios.delete(url, {
          ...header,
          data: item,
        });
        if (response.data.message === "success") {
          const remainingReviews = myComments.filter(
            (itm) => itm._id !== item?._id
          );
          setMyComments(remainingReviews);
          toast.success("Comment Deleted");
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      }
    };

    deleteReview();
  };

  const handleActiveEdete = (item: CommentType) => {
    setEdeteActive(!edeteActive);
    setEdetedId(item?._id);
    setComment(item);
  };

  const handleResetEdete = () => {
    setEdeteActive(!edeteActive);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const commen = data.comment ? data.comment : comment?.comment;

    const commentInfo = {
      id: comment?._id,
      comment: commen,
    };

    axios
      .put(
        `${process.env.BASE_URL}blog/update-comment?email=${user?.email}`,
        commentInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setEdeteActive(!edeteActive);

          setupdateComment(!updateComment);
          toast.success(`Review Updated`);
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
      {myComments.length ? (
        <div className={`student-profile-reviews ${myComments.length > 4 ? "scrollbox" : ""}`}>
          {myComments.map((item) => (
            <div key={item._id} className="student-profile-reviews-item mb-30">
              <div className="student-profile-reviews-course-title">
                <h5>
                  {" "}
                  <Link href={`/blog-details/${item?.postId}`}>
                    {item?.title ? item?.title : "Blog Name Not Set"}
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
                      <div className="student-profile-review-icon">
                        <p>{item?.date}</p>
                      </div>
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
                      <label htmlFor="Current">Update Comment</label>
                      <input
                        id="Current"
                        type="text"
                        placeholder="Type New Review"
                        defaultValue={item?.comment}
                        {...register("comment")}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="cont-btn mb-20  mt-10">
                          <button type="submit" className="update-close-btn">
                            Update comment
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
                        <p>{item?.date}</p>
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
                      <p>{item?.comment}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center">No comments </p>
        </>
      )}
    </>
  );
};

export default UserComments;
