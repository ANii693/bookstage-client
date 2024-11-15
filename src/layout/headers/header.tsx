"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sidebar from "@/sheardComponent/Sidebar";
import useGlobalContext from "../../hooks/use-context";
import HeaderTop from "./header-top";
import NavMenu from "./navmenu";
import Image from "next/image";
import whiteLogo from "../../../public/assets/img/logo/logo.png";
import blackLogo from "../../../public/assets/img/logo/logo-2.png";
import headerLogo from "../../../public/assets/img/logo/logo-bg.png";
import hotline from "../../../public/assets/img/icon/action-hotline.png";
import SearchIcon from "@/sheardComponent/elements/icons/search-icon";
import CartIcon from "@/sheardComponent/elements/icons/cart-icon";
import WishlistIcon from "@/sheardComponent/elements/icons/wishlist-icon";
import User from "@/sheardComponent/elements/icons/user";
import {
  useTotalProductCount,
  useTotalProductWishlistCount,
} from "@/hooks/useCartQuantity";
import SidebarCart from "./SidebarCart";
import SidebarWishlist from "./SidebarWishlist";
import HeaderOneSearchBar from "./HeaderOneSearchBar";

const HeaderOne = () => {
  const { setShowSidebar, setOpenCart, user, setOpenWishlist } =
    useGlobalContext();
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
        <HeaderTop />
        <div id="header-sticky">
          <div className="bd-header__area-2 position-relative">
            <div className="container">
              <div className="bd-header__main-wrapper-2">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="bd-header__main-content">
                      <div className="bd-header__left-2">
                        <div className="bd-header__logo-2 p-relative">
                          <Link href="/">
                            <Image
                              className="logo-white"
                              src={whiteLogo}
                              alt="logo"
                            />
                            <Image
                              className="logo-black"
                              src={blackLogo}
                              alt="logo"
                            />
                          </Link>
                          {/* <div className="bd-header__logo-bg">
                            <Image src={headerLogo} alt="logo-bg" />
                          </div> */}
                        </div>
                        <div className="main-menu d-none d-none d-lg-block">
                          <nav id="mobile-menu">
                            <NavMenu />
                          </nav>
                        </div>
                      </div>
                      <div className="bd-header__right header__right-2">
                        <div className="bd-action__cart-list justify-content-end">
                          <HeaderOneSearchBar />
                          <div className="bd-action__item bd-action__item-cart">
                            <div className="bd-action__cart">
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
                          <div className="bd-action__item d-sm-flex  align-items-center">
                            {user?.email ? (
                              <>
                                <div className="bd-action__cart">
                                  <div className="bd-action__cart-icon">
                                    <Link
                                      className="header-author-img"
                                      href="/profile"
                                    >
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
                                            alt="trending-quite"
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
                                    <Link href="/login">
                                      <User />
                                    </Link>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bd-action__hotline d-none d-xl-block">
                          <div className="bd-hotline__inner">
                            <div className="bd-hotline__icon">
                              <Image src={hotline} alt="hotline-icon" />
                            </div>
                            <div className="bd-hotline__text">
                              <span>Contact hotline</span>
                              <Link href="tel:878-185-287">
                                878 - 185 - 287
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="header__hamburger d-flex d-xl-none">
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
            </div>
          </div>
        </div>
      </header>

      <Sidebar />
      <SidebarCart />
      <SidebarWishlist />
    </>
  );
};

export default HeaderOne;
