import Link from "next/link";
import React from "react";

interface paginationType {
  Pagination_space: string;
  totalPages: number;
  currentPage: number;
  setPage: any;
}

const Pagination = ({
  Pagination_space,
  totalPages,
  currentPage,
  setPage,
}: paginationType) => {
  const paginationItems: any = [];

  // Loop through totalPages and generate pagination elements
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    paginationItems.push(
      <li
        className={pageNumber === currentPage ? "active" : ""}
        key={pageNumber}
      >
        <Link href="" onClick={() => setPage(pageNumber)}>
          {pageNumber < 10 ? "0" + pageNumber : pageNumber}
        </Link>
      </li>
    );
  }

  return (
    <div
      className={`bd-basic__pagination ${
        Pagination_space ? Pagination_space : "mt-30 mb-20"
      }`}
      data-wow-delay=".3s"
    >
      <nav>
        <ul>{paginationItems}</ul>
      </nav>
    </div>
  );
};

export default Pagination;
