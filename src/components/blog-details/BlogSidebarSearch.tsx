"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios"; // Make sure axios is installed
import useGlobalContext from "@/hooks/use-context"; // Make sure the path is correct

const BlogSidebarSearch = () => {
  const { setBlog } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`${process.env.BASE_URL}blog/search-blog?search=${searchValue}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  return (
    <div className="sidebar__search p-relative mb-30">
      <form onSubmit={handleSearch} action="#">
        <input
          value={searchValue}
          type="text"
          placeholder="Search for blogs..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          <i className="flaticon-magnifiying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default BlogSidebarSearch;
