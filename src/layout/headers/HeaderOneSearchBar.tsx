"use client";
import useGlobalContext from "@/hooks/use-context";
import SearchIcon from "@/sheardComponent/elements/icons/search-icon";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const HeaderOneSearchBar = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { products, setProducts, setProdcutLoadding } = useGlobalContext();
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = searchRef.current as HTMLElement | null;
      if (
        currentRef &&
        currentRef.contains &&
        !currentRef.contains(event.target as Node)
      ) {
        setOpenSearchBox(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProducts([]);
    setSearchQuery(event.target.value);
    setOpenSearchBox(true);
    if (event.target.value === "") {
      setProducts([]);
      setOpenSearchBox(false);
      setProdcutLoadding(false);
    } else {
      setProdcutLoadding(true);
      axios
        .get(
          `${process.env.BASE_URL}product/search-products-admin?search=${searchQuery}`
        )
        .then((res) => {
          setProducts(res.data);
          setProdcutLoadding(false);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  

  return (
    <>
      <div ref={searchRef} className="bd-action__item bd-action__item-search">
        <div className="bd-action__item">
          <div className="bd-action__search-icon p-relative">
            <span
              className={
                searchOpen
                  ? "search-toggle bd-h-search bd-cart-mini-btn opened"
                  : "search-toggle bd-h-search bd-cart-mini-btn"
              }
              onClick={() => {
                setSearchOpen(!searchOpen);
              }}
            >
              <SearchIcon />
              <i className="fal fa-times"></i>
            </span>
            <div
              className={
                searchOpen
                  ? "bd-search__toggle header_search-open"
                  : "bd-search__toggle"
              }
            >
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search here..."
                />
              </form>
              <div
            className={`search-result-inner ${
              openSearchBox ? "open_search_box search_wrapper" : ""
            }`}
          >
            <div className="search-result-l">
              {products?.length ? (
                <>
                  {products?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="search_product header_search_one"
                      >
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="preview_img">
                              <Image
                                src={item?.img}
                                alt="product-img"
                                width={50}
                                height={50}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="single_product">
                              <Link href={`/shop-details/${item._id}`}>
                                {item.productName}
                              </Link>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
            </div>
          </div>

          {/* show serch result */}

          
        </div>
      </div>
    </>
  );
};

export default HeaderOneSearchBar;
