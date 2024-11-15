"use client";
import useGlobalContext from "@/hooks/use-context";
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
const SidebarSearchContent = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { products, setProducts, setProdcutLoadding,setShowSidebar } = useGlobalContext();
  const searchRef = useRef(null);
  const safeSetShowSidebar = setShowSidebar || (() => {});
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
      <form ref={searchRef} action="#" className="p-relative">
        <input
          type="text"
          placeholder="What are you searching for?"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <i className="far fa-search"></i>
        </button>

        <div
          className={`search-result-inner search-result-inner-two ${
            openSearchBox
              ? "open_search_box search_wrapper search_wrapper_two"
              : ""
          }`}
        >
          <div className="search-result-2">
            {products?.length ? (
              <>
                {products?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="search_product header_search_one search_two"
                    >
                      <div className="product_wrapper">
                        <div className="preview_img">
                          <Image
                            src={item?.img}
                            alt="product-img"
                            width={50}
                            height={50}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </div>
                        <div className="single_product">
                          <Link onClick={() => safeSetShowSidebar(false)} href={`/shop-details/${item._id}`}>
                            {item.productName}
                          </Link>
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
      </form>
    </>
  );
};

export default SidebarSearchContent;
