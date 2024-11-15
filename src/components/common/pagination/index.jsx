import Link from "next/link";
import React from "react";

const PaginationData = () => {
  return (
    <div className="pagination-wrap">
      <ul className="pagination">
        <li>
          <Link href="#">
            <i className="far fa-chevron-left"></i>
          </Link>
        </li>
        <li className="active">
          <Link href="#">01</Link>
        </li>
        <li>
          <Link href="#">02</Link>
        </li>
        <li>
          <Link href="#">
            <i className="far fa-chevron-right"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PaginationData;
