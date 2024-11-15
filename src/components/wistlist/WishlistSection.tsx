"use client";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { cart_product } from "@/redux/slices/cartSlice";
import { remove_wishlist_product } from "@/redux/slices/wishlistSlice";

const WishlistSection = () => {
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.cartProducts
  );
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => e.preventDefault();
  return (
    <div className="cart-area pt-115 pb-130">
      <div className="container small-container">
        {wishlist.length === 0 && (
          <div className="text-center">
            <h3>Your wishlist is empty</h3>
          </div>
        )}
        {wishlist.length >= 1 ?
        <>
        <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Images</th>
                        <th className="cart-product-name">Product</th>
                        <th className="product-price">Unit Price</th>
                        <th className="product-quantity">Add to cart</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <Link href={`/shop-details/${item._id}`}>
                              <Image
                                src={item.img}
                                width={50}
                                height={50}
                                style={{ width: "auto", height: "auto" }}
                                alt=""
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link href={`/shop-details/${item._id}`}>
                              {item.productName}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="amount">${item.price}.00</span>
                          </td>
                          <td className="product-quantity">
                            <button
                              className="bd-border__btn"
                              onClick={() => dispatch(cart_product(item))}
                            >
                              Add to Cart
                            </button>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              ${item.price * item.totalCard}.00
                            </span>
                          </td>
                          <td
                            className="product-remove"
                            onClick={() =>
                              dispatch(remove_wishlist_product(item))
                            }
                          >
                            <i className="fa fa-times"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </>
        :
        <>
        
        </>
          
        }
      </div>
    </div>
  );
};

export default WishlistSection;
