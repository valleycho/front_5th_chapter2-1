import {
  cartItemsElement,
  cartTotalElement,
  renderUpdatePoint,
  updateStockStatus,
} from '../components';
import { createElement, productState } from '.';

function calculateCartTotal(cartState) {
  const products = productState.getProducts();

  let cartItemsChildrenElement = cartItemsElement.children;

  for (let i = 0; i < cartItemsChildrenElement.length; i++) {
    let currentProduct;

    for (let j = 0; j < products.length; j++) {
      const isSelectedSameProduct =
        products[j].id === cartItemsChildrenElement[i].id;

      if (isSelectedSameProduct) {
        currentProduct = products[j];
        break;
      }
    }

    let quantity = parseInt(
      cartItemsChildrenElement[i]
        .querySelector('span')
        .textContent.split('x ')[1],
    );
    let itemTotalPrice = currentProduct.price * quantity;
    const isDiscount = quantity >= 10;
    let discountRate = getCurrentProductDiscountRate(
      isDiscount,
      currentProduct,
    );

    cartState.cartItemQuantity += quantity;
    cartState.subTot += itemTotalPrice;
    cartState.cartTotalAmount += itemTotalPrice * (1 - discountRate);
  }
}

function getCurrentProductDiscountRate(isDiscount, currentProduct) {
  if (!isDiscount) return 0;

  if (currentProduct.id === 'p1') {
    return 0.1;
  } else if (currentProduct.id === 'p2') {
    return 0.15;
  } else if (currentProduct.id === 'p3') {
    return 0.2;
  } else if (currentProduct.id === 'p4') {
    return 0.05;
  } else if (currentProduct.id === 'p5') {
    return 0.25;
  }

  return 0;
}

function calculateDiscountRate(cartState) {
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

function specialDiscount(cartState) {
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

function updateTotalPrice(cartState) {
  cartTotalElement.textContent = `총액: ${Math.round(cartState.cartTotalAmount)}원`;
}

function updateCartDiscount(discountRate) {
  const discountedRate = (discountRate * 100).toFixed(1);

  const discountElement = createElement('span', {
    className: 'text-green-500 ml-2',
    textContent: `(${discountedRate}% 할인 적용)`,
  });

  cartTotalElement.appendChild(discountElement);
}

export function updateCart() {
  const cartState = {
    discountRate: 0,
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    subTot: 0,
  };
  let point = 0;

  calculateCartTotal(cartState);

  calculateDiscountRate(cartState);

  specialDiscount(cartState);

  updateTotalPrice(cartState);

  if (cartState.discountRate > 0) {
    updateCartDiscount(cartState.discountRate);
  }

  updateStockStatus();

  renderUpdatePoint(point, cartState.cartTotalAmount);
}
