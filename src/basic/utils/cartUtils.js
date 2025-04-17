import { cartTotal, stockQuantityStatus } from '../components';
import { getBulkDiscountRate, getSpecialDiscountRate } from './discountUtils';

export function updateCart() {
  const cartState = {
    discountRate: 0,
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    subTot: 0,
  };

  cartTotal.calculateCartTotal(cartState);

  getBulkDiscountRate(cartState);
  getSpecialDiscountRate(cartState);

  cartTotal.updateCartTotal(cartState.cartTotalAmount);

  if (cartState.discountRate > 0) {
    cartTotal.updateCartDiscount(cartState.discountRate);
  }

  stockQuantityStatus.updateStockStatus();

  cartTotal.updateCartPoint(cartState.cartTotalAmount);
}
