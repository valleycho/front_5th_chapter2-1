import { cartTotal, stockQuantityStatus } from '../components';
import { getBulkDiscountRate, getSpecialDiscountRate } from './discountUtils';
import { cartStore } from '../store';

export function updateCart() {
  const cartState = {
    itemQuantity: 0,
    totalPrice: 0,
    subTotalPrice: 0,
  };

  cartTotal.calculateCartTotal(cartState);

  getBulkDiscountRate(cartState);
  getSpecialDiscountRate(cartState);

  cartTotal.updateCartTotal(cartState.totalPrice);

  if (cartStore.getDiscountRate() > 0) {
    cartTotal.updateCartDiscount();
  }

  stockQuantityStatus.updateStockStatus();

  cartTotal.updateCartPoint(cartState.totalPrice);
}
