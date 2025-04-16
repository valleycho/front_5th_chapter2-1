import { Product } from "../provider/ProductProvider";

export function getDiscountRate(targetCartItem: Product, cartTotalPrice: number, subTotalPrice: number): number {
  if (targetCartItem.quantity + 1 >= 10) {
    return getProductDiscountRate(targetCartItem.id);
  }

  if (targetCartItem.quantity + 1 >= 30) {
    return getBulkDiscountRate(cartTotalPrice, subTotalPrice);
  }

  return 0;
}


export function getProductDiscountRate(productId: string) {
  if (productId === 'p1') return 0.1;
  if (productId === 'p2') return 0.15;
  if (productId === 'p3') return 0.2;
  if (productId === 'p4') return 0.05;
  if (productId === 'p5') return 0.25;

  return 0;
}

export function getBulkDiscountRate(cartItemTotalPrice: number, subTotalPrice: number): number {
  const bulkDiscountPrice = cartItemTotalPrice * 0.25;
  const itemDiscountPrice = subTotalPrice - cartItemTotalPrice;

  if (bulkDiscountPrice > itemDiscountPrice) {
    return 0.25;
  }

  return (subTotalPrice - cartItemTotalPrice) / subTotalPrice;
}
