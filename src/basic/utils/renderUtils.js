import {
  cartWrapperElement,
  cartContentElement,
  cartText,
  cartItemsElement,
  cartTotalElement,
  selectProductElement,
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
    selectProductElement,
    addCartButtonElement,
    stockQuantityStatusElement,
  ];

  cartContentElement.append(...cartChildren);
  updateOptionElement();
  cartWrapperElement.appendChild(cartContentElement);

  rootElement.appendChild(cartWrapperElement);
}
