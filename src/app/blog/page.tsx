import BlogGridMain from "@/components/blog-grid/BlogGridMain";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const BlogGridPage = () => {
  return (
    <>
      <Wrapper>
        <main>
          <BlogGridMain />
        </main>
      </Wrapper>
    </>
  );
};

export default BlogGridPage;
