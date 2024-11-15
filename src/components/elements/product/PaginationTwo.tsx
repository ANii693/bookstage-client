import Link from "next/link";
import React from "react";

interface paginationType {
  Pagination_space: string;
  totalPages: number;
  currentPage: number;
  setPage: any;
}

const PaginationTwo = ({
  Pagination_space,
  setPage,
}: paginationType) => {



  return (
    <div
      className={`bd-basic__pagination ${
        Pagination_space ? Pagination_space : "mt-30 mb-20"
      }`}
      data-wow-delay=".3s"
    >
      <nav>
        <ul><li
        className="active"
        
      >
        <Link href="" onClick={() => setPage(1)}>
          Back
        </Link>
      </li></ul>
      </nav>
    </div>
  );
};

export default PaginationTwo;
