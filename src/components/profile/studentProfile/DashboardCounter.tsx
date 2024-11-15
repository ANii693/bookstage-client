"use client";
import CountUpContent from "@/components/common/counter/CountUpContent";
import useGlobalContext from "@/hooks/use-context";
import {
  useTotalProductCount,
  useTotalProductWishlistCount,
   
} from "@/hooks/useCartQuantity";
import React from "react";
const DashboardCounter = () => {
  const { totalProduct } = useGlobalContext();
  const cartQuantity = useTotalProductCount();
  const WishlistQuantity = useTotalProductWishlistCount();
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-6 col-md-4">
        <div className="counter-wrapper text-center mb-30">
          <div className="counter-icon">
            <div className="counter-icon-wrap">{/* incon will be here */}</div>
            <div className="count-number">
              <CountUpContent number={totalProduct} text="" />
              <p> My purches </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-4">
        <div className="counter-wrapper text-center mb-30">
          <div className="counter-icon">
            <div className="counter-icon-wrap">{/* incon will be here */}</div>
            <div className="count-number">
              <span className="counter">
                <CountUpContent number={cartQuantity} text="" />
              </span>
              <p> My Cart </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-4">
        <div className="counter-wrapper text-center mb-30">
          <div className="counter-icon">
            <div className="counter-icon-wrap">{/* incon will be here */}</div>
            <div className="count-number">
              <span className="counter">
                <CountUpContent number={WishlistQuantity} text="" />
              </span>
              <p> My Wishlist </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCounter;
