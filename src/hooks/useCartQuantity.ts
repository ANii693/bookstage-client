import { CartProductType } from '@/interFace/interFace';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';


export const useUniqueProductCount = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

  const uniqueProductIds = new Set();
  cartProducts.forEach((product: any) => uniqueProductIds.add(product._id));

  return uniqueProductIds.size;
};
export const useUniqueWishlstCount = () => {
  const cartProducts = useSelector((state: RootState) => state.wishlist.cartProducts);

  const uniqueProductIds = new Set();
  cartProducts.forEach((product: any) => uniqueProductIds.add(product._id));

  return uniqueProductIds.size;
};

export const useTotalProductCount = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);
  let totalCount = 0;
  cartProducts.forEach((product: CartProductType) => {
    totalCount += product.totalCard as number;
  });

  return totalCount;
};
export const useTotalProductWishlistCount = () => {
  const cartProducts = useSelector((state: RootState) => state.wishlist.cartProducts);
  let totalCount = 0;
  cartProducts.forEach((product: CartProductType) => {
    totalCount += product.totalCard as number;
  });

  return totalCount;
};
