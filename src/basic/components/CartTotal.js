import { createElement } from '../utils/elementUtils';

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
};
