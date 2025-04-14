import { saleInit, eventInit, calcCart } from './utils';
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
} from './components';

function renderInit() {
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

function main() {
  renderInit();
  eventInit();

  calcCart();

  saleInit();
}

main();
