"use client";
import useGlobalContext from "@/hooks/use-context";
import { CommentType, dynamicIdType } from "@/interFace/api-interFace";
import axios from "axios";
import React, { useState, useEffect } from "react";
import userIcon from "../../../public/assets/img/icon/user-icon.png";
import Image from "next/image";
const BlogComments = ({ id }: dynamicIdType) => {
  const { newComment } = useGlobalContext();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [viewMore, setviewMore] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}blog/comments/${id}`)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((e) => {});
  }, [id, newComment]);

  return (
    <>
      <div>
        {comments.length ? (
          <div className="bd-postbox__comment  mb-55 mt-30">
            <h3 className="postbox__comment-title">
              {" "}
              {comments.length > 1
                ? `${comments.length} comments`
                : `${comments.length} comment`}{" "}
            </h3>
            <ul className={comments?.length ? "scrollbox" : ""}>
              {comments.map((item) => (
                <li key={item._id}>
                  <div className="bd-postbox__comment-box d-flex">
                    <div className="bd-postbox__comment-avater comment-img mr-30">
                      <Image
                        src={item?.img ? item?.img : userIcon}
                        alt="comments-img"
                        width={100}
                        height={100}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="bd-postbox__comment-info">
                      <div className="bd-postbox__comment-avater-info d-flex justify-content-between">
                        <div className="bd-postbox__comment-name">
                          <h4> {item.name} </h4>
                          <span className="post-meta">
                            <i className="fa-light fa-calendar-days"></i>{" "}
                            {item.date}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="bd-postbox__comment-text">
                        <p> {item.comment} </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BlogComments;
