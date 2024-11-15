import useGlobalContext from "@/hooks/use-context";
import { CategoryType } from "@/interFace/api-interFace";
import ShopSidebarPreloader from "@/preloaders/ShopSidebarPreloader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ShopSidebarCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setProducts, setotalPages, setcurrentPage, limit, setPage, page } =
    useGlobalContext();
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.BASE_URL}setting/category`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false)
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (searchValue) {
      axios
        .get(
          `${process.env.BASE_URL}product/search-products?search=${searchValue}&page=${page}&limit=${limit}`
        )
        .then((res) => {
          setProducts(res.data.products);
          setotalPages(res.data.totalPages);
          setcurrentPage(res.data.currentPage);
          setPage(1);
        })
        .catch((e) => console.log(e));
    }
  }, [
    searchValue,
    setProducts,
    setotalPages,
    setcurrentPage,
    page,
    limit,
    setPage,
  ]);

  const handleViewAll = () => {
    axios
      .get(
        `${process.env.BASE_URL}product/all-products?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
        setPage(1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="bd-filter__widget child-content-hidden">
        <h4 className="bd-filter__widget-title drop-btn">Categories</h4>
        <div className="bd-filter__content">
          <div onClick={handleViewAll} className="bd-singel__rating">
            <input
              className="radio-box"
              type="radio"
              id="view-all-1"
              name="rating"
            />
            <label className="radio-star" htmlFor="view-all-1">
              <div className="bd-product__icon custome-cursor text-capitalize">
                view all
              </div>
            </label>
          </div>
          {categories?.length ? (
            categories.map((item, index) => (
              <div
                onClick={() => setSearchValue(item.categoryName)}
                key={index}
                className="bd-singel__rating"
              >
                <input
                  className="radio-box"
                  type="radio"
                  id={item._id}
                  name="rating"
                />
                <label className="radio-star" htmlFor={item._id}>
                  <div className="bd-product__icon custome-cursor text-capitalize">
                    {item.categoryName}
                  </div>
                </label>
              </div>
            ))
          ) : (
            <>
             {
              loading ?
              <>
               <p className="text-center">No Category Found</p>
              </>
              :
              <>
              <ShopSidebarPreloader end={7}/>
              </>
             }
          </>
          )}
         
        </div>
      </div>
    </>
  );
};

export default ShopSidebarCategories;
