export function getProductDiscountRate(productId) {
  if (productId === 'p1') {
    return 0.1;
  } else if (productId === 'p2') {
    return 0.15;
  } else if (productId === 'p3') {
    return 0.2;
  } else if (productId === 'p4') {
    return 0.05;
  } else if (productId === 'p5') {
    return 0.25;
  }

  return 0;
}

export function getBulkDiscountRate(cartState) {
  const minQuantityForBulkDiscount = 30;
  const twentyFivePercentDiscountRate = 0.25;

  if (cartState.cartItemQuantity >= minQuantityForBulkDiscount) {
    const bulkDiscountAmount =
      cartState.cartTotalAmount * twentyFivePercentDiscountRate;
    const itemDiscountAmount = cartState.subTot - cartState.cartTotalAmount;

    if (bulkDiscountAmount > itemDiscountAmount) {
      cartState.cartTotalAmount =
        cartState.subTot * (1 - twentyFivePercentDiscountRate);
      cartState.discountRate = twentyFivePercentDiscountRate;
    } else {
      cartState.discountRate =
        (cartState.subTot - cartState.cartTotalAmount) / cartState.subTot;
    }
  } else {
    cartState.discountRate =
      (cartState.subTot - cartState.cartTotalAmount) / cartState.subTot;
  }
}

export function getSpecialDiscountRate(cartState) {
  const isSpecialDiscountDay = new Date().getDay() === 2;
  const tenPercentDiscountRate = 0.1;

  if (isSpecialDiscountDay) {
    cartState.cartTotalAmount *= 1 - tenPercentDiscountRate;
    cartState.discountRate = Math.max(
      cartState.discountRate,
      tenPercentDiscountRate,
    );
  }
}
