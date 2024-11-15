"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import useGlobalContext from "../../hooks/use-context";
import HeaderMiddleTwo from "./header-middle-two";
import HeaderTopTwo from "./header-top-two";
import NavMenu from "./navmenu";
import User from "@/sheardComponent/elements/icons/user";
import logo from "../../../public/assets/img/logo/logo-2.png";
import Image from "next/image";
import CartIcon from "@/sheardComponent/elements/icons/cart-icon";
import WishlistIcon from "@/sheardComponent/elements/icons/wishlist-icon";
import Sidebar from "@/sheardComponent/Sidebar";
import { useTotalProductCount, useTotalProductWishlistCount } from "@/hooks/useCartQuantity";
import SidebarCart from "./SidebarCart";
import SidebarWishlist from "./SidebarWishlist";

const HeaderTwo = () => {
  const { setShowSidebar, setOpenCart, user,setOpenWishlist } = useGlobalContext();
  const safeSetShowSidebar = setShowSidebar || (() => {});
  const productQuantity = useTotalProductCount();
  const wishlistQuantity = useTotalProductWishlistCount();
  useEffect(() => {
    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  });

  const sticky = () => {
    const header = document.querySelector("#header-sticky");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 40
        ? header.classList.add("header-sticky")
        : header.classList.remove("header-sticky");
    }
  };
  // Sticky Menu Area End
  return (
    <>
      <header>
        <HeaderTopTwo />
        {/* <HeaderMiddleTwo /> */}
        <div
          id="header-sticky"
          className="bd-header__bottom-area-3 transparent__header"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-6 col-6">
                <div className="bd-header__logo-3">
                  <Link href="/">
                    <Image src={logo} style={{ width: "auto", height: "auto" }} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-5 col-xl-5 col-lg-6 d-none d-lg-block">
                <div className="bd-header__left-3">
                  <div className="main-menu d-none d-none d-lg-block">
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xxl-5 col-xl-5 col-lg-3 col-md-6 col-6">
                <div className="bd-header__right header__right-3">
                  <div className="bd-action__filter-wrapper d-none d-xl-block">
                    <div className="bd-action__filter p-relative">
                      <form action="#">
                        <input type="text" placeholder="Search products..." />
                        <button>
                          <i className="flaticon-magnifiying-glass"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="bd-action__cart-list list-3">
                    <div className="bd-action__item">
                      <div className="bd-action__cart-wrapper">
                        <div
                          className="bd-action__cart-icon"
                          onClick={() => setOpenCart(true)}
                        >
                          <span className="bd-cart-mini-btn">
                            <CartIcon />
                          </span>
                          <span className="bd-action__item-number cart-count">
                            {productQuantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bd-action__item">
                        <div className="bd-action__wishlist">
                          <div
                            className="bd-action__wistlist-icon"
                            onClick={() => setOpenWishlist(true)}
                          >
                            <span className="bd-cart-mini-btn">
                              <WishlistIcon />
                            </span>
                            <span className="bd-action__item-number wishlist-count">
                              {wishlistQuantity}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="bd-action__item d-sm-flex  align-items-center">
                    {user?.email ? (
                      <>
                        <div className="bd-action__cart">
                          <div className="bd-action__cart-icon">
                            <Link className="header-author-img user-link" href="/profile">
                              {user?.photo ? (
                                <>
                                  <Image
                                    src={user?.photo}
                                    width={50}
                                    height={50}
                                    style={{
                                      width: "auto",
                                      height: "auto",
                                    }}
                                    alt="user Icon"
                                  />
                                </>
                              ) : (
                                <>
                                  <User />
                                </>
                              )}
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bd-action__cart">
                          <div className="bd-action__cart-icon">
                            <Link className="user-link" href="/login">
                              <User />
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="header__hamburger d-flex d-lg-none">
                    <button
                      type="button"
                      className="hamburger-btn"
                      onClick={() => safeSetShowSidebar(true)}
                    >
                      <span className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
      <SidebarCart />
      <SidebarWishlist/>
    </>
  );
};

export default HeaderTwo;
