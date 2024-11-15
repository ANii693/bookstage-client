"use client";
import { blogDataType } from "@/interFace/api-interFace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const BlogSidebarBlogs = () => {
  const [blogs, setBlogs] = useState<blogDataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}blog/all-blog?page=${page}&limit=${limit}`)
      .then((res) => {
        setBlogs(res.data.blogs);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, [page, limit, setBlogs]);

  return (
    <div className="sidebar__widget mb-30">
      <div className="sidebar__widget-head mb-35">
        <h4 className="sidebar__widget-title">Recent posts</h4>
      </div>
      <div className="sidebar__widget-content">
        {blogs && (
          <div className="rc__post-wrapper">
            {blogs.slice(0, 4).map((item, num) => {
              const title = item.title;
              const words = title.split(" ");
              const sortTitle = words.slice(0, 5).join(" ");
              return (
                <div className="rc__post d-flex align-items-center" key={num}>
                  <div className="rc__thumb mr-20">
                    <Link href={`/blog-details/${item._id}`}>
                      <Image
                        width={80}
                        height={120}
                        style={{ width: "auto", height: "100%" }}
                        src={item.img}
                        alt="news-image"
                      />
                    </Link>
                  </div>
                  <div className="rc__content">
                    <div className="rc__meta">
                      <span>{item.date}</span>
                    </div>
                    <h6 className="rc__title">
                      <Link href={`/blog-details/${item._id}`}>
                        {sortTitle}
                      </Link>
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSidebarBlogs;
