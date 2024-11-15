"use client";

import { CartProductType } from "@/interFace/interFace";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import moment from "moment";

interface CartState {
  cartProducts: CartProductType[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlist_product: (state, { payload }: PayloadAction<CartProductType>) => {
      const productIndex = state.cartProducts.findIndex(
        (item) => item._id === payload._id
      );

      if (productIndex >= 0) {
        state.cartProducts[productIndex].totalCard! += 1;
        toast.info("Increase Product wishlist Quantity");
      } else {
        const now = moment();
        const orderDate = now.format("MM/DD/YY hh:mm a"); // Format the current date as "MM/DD/YY hh:mm a"

        const tempProduct = {
          ...payload,
          totalCard: 1,
          orderDate: orderDate, // Include the formatted date as "orderDate"
        };

        state.cartProducts.push(tempProduct);
        const capitalizedCategoryName =
          payload.productName.charAt(0).toUpperCase() +
          payload.productName.slice(1);
        toast.success(`${capitalizedCategoryName} added to wishlist`);
      }
    },
    remove_wishlist_product: (
      state,
      { payload }: PayloadAction<CartProductType>
    ) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== payload._id
      );
      toast.error(`remove from your wishlist`);
    },

    clear_wishlist: (state) => {
      const confirmMsg = window.confirm(
        "Are you sure deleted your all wishlist items ?"
      );
      if (confirmMsg) {
        state.cartProducts = [];
      }
    },
    decrease_quantity: (state, { payload }: PayloadAction<CartProductType>) => {
      const cartIndex = state.cartProducts.findIndex(
        (item) => item._id === payload._id
      );
      if (cartIndex >= 0 && state.cartProducts[cartIndex]?.totalCard) {
        if (state.cartProducts[cartIndex].totalCard > 1) {
          state.cartProducts[cartIndex].totalCard -= 1;
        } else {
          toast.error(`Quantity cannot be less than 1`);
        }
      }
    },
  },
});

export const {
  wishlist_product,
  remove_wishlist_product,
  clear_wishlist,
  decrease_quantity,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
