import {
  cartWrapperElement,
  cartContentElement,
  cartText,
  cartItemsElement,
  cartTotalElement,
  productSelectElement,
  updateOptionElement,
  addCartButtonElement,
  stockQuantityStatusElement,
} from '../components';

export function renderInit() {
  const rootElement = document.getElementById('app');

  const cartChildren = [
    cartText,
    cartItemsElement,
    cartTotalElement,
    productSelectElement,
    addCartButtonElement,
    stockQuantityStatusElement,
  ];

  cartContentElement.append(...cartChildren);
  updateOptionElement();
  cartWrapperElement.appendChild(cartContentElement);

  rootElement.appendChild(cartWrapperElement);
}
