import { cartStore } from '../store';

export function getProductDiscountRate(productId) {
  if (productId === 'p1') return 0.1;
  if (productId === 'p2') return 0.15;
  if (productId === 'p3') return 0.2;
  if (productId === 'p4') return 0.05;
  if (productId === 'p5') return 0.25;

  return 0;
}

export function getBulkDiscountRate(cartState) {
  const minQuantityForBulkDiscount = 30;
  const twentyFivePercentDiscountRate = 0.25;

  if (cartState.itemQuantity >= minQuantityForBulkDiscount) {
    const bulkDiscountAmount =
      cartState.totalPrice * twentyFivePercentDiscountRate;
    const itemDiscountAmount = cartState.subTotalPrice - cartState.totalPrice;

    if (bulkDiscountAmount > itemDiscountAmount) {
      cartState.totalPrice =
        cartState.subTotalPrice * (1 - twentyFivePercentDiscountRate);
      cartStore.setDiscountRate(twentyFivePercentDiscountRate);
    } else {
      cartState.setDiscountRate(
        (cartState.subTotalPrice - cartState.totalPrice) /
          cartState.subTotalPrice,
      );
    }
  } else {
    cartStore.setDiscountRate(
      (cartState.subTotalPrice - cartState.totalPrice) /
        cartState.subTotalPrice,
    );
  }
}

export function getSpecialDiscountRate(cartState) {
  const isSpecialDiscountDay = new Date().getDay() === 2;
  const tenPercentDiscountRate = 0.1;

  if (isSpecialDiscountDay) {
    cartState.totalPrice *= 1 - tenPercentDiscountRate;
    cartStore.setDiscountRate(
      Math.max(cartStore.getDiscountRate(), tenPercentDiscountRate),
    );
  }
}
