import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_product } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/store';
import { CartProductType } from '@/interFace/interFace';

const BookButton = ({ product }: { product: CartProductType }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

  const isProductInCart = cartProducts.some(item => item._id === product._id);

  const handleBook = () => {
    if (!isProductInCart) {
      dispatch(cart_product({ ...product, totalCard: 1 }));
    }
  };

  return (
    <div className="product-book-form">
      <button
        className="cart-btn bd-fill__btn"
        onClick={handleBook}
        disabled={isProductInCart}
      >
        {isProductInCart ? 'BOOKED' : 'BOOK'}
      </button>
    </div>
  );
};

export default BookButton;