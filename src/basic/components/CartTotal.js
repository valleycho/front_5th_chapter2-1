import { createElement } from '../utils/elementUtils';
import { productStore } from '../store';
import { cartItems } from './CartItems';
import { getProductDiscountRate } from '../utils';

export const cartTotal = {
  $element: null,
  render() {
    const cartTotalElement = createElement('div', {
      id: 'cart-total',
      className: 'text-xl font-bold my-4',
    });

    this.$element = cartTotalElement;

    return this.$element;
  },
  getElement() {
    return this.$element;
  },
  updateCartTotal(cartTotalPrice) {
    this.$element.textContent = `총액: ${cartTotalPrice}원`;
  },
  updateCartDiscount(discountRate) {
    const discountedRate = (discountRate * 100).toFixed(1);

    const discountElement = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${discountedRate}% 할인 적용)`,
    });

    this.$element.appendChild(discountElement);
  },
  updateCartPoint(cartTotalAmount) {
    const point = Math.floor(cartTotalAmount / 1000);

    let pointElement = document.getElementById('loyalty-points');
    if (!pointElement) {
      pointElement = createElement('span', {
        id: 'loyalty-points',
        className: 'text-blue-500 ml-2',
      });

      this.$element.appendChild(pointElement);
    }

    pointElement.textContent = `(포인트: ${point})`;
  },
  calculateCartTotal(cartState) {
    const products = productStore.getProducts();

    let cartItemsChildrenElement = cartItems.getElement().children;

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
      let discountRate = 0;

      const isDiscount = quantity >= 10;
      if (isDiscount) {
        discountRate = getProductDiscountRate(currentProduct.id);
      }

      cartState.cartItemQuantity += quantity;
      cartState.subTot += itemTotalPrice;
      cartState.cartTotalAmount += itemTotalPrice * (1 - discountRate);
    }
  },
};
