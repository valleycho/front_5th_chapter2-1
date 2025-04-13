import { flashSale, recommendSale } from './saleUtils';
import {
  cartWrapperElement,
  cartContentElement,
  cartText,
  cartItemsElement,
  cartTotalElement,
} from './components/Cart';
import {
  productSelectElement,
  renderProductSelectOptions,
} from './components/productSelect';
import { addCartButtonElement } from './components/AddCartButton';
import { stockQuantityStatusElement } from './components/StockQuantityStatus';
import { productState } from './productUtils';
import { calcCart } from './cartUtils';
import { handleAddCartButtonClick } from './components/AddCartButton';
import { handleCartItemsClick } from './components/Cart';

let products = productState.getProducts();

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
  renderProductSelectOptions();
  cartWrapperElement.appendChild(cartContentElement);

  rootElement.appendChild(cartWrapperElement);
}

function eventInit() {
  addCartButtonElement.addEventListener('click', handleAddCartButtonClick);

  cartItemsElement.addEventListener('click', handleCartItemsClick);
}

function main() {
  renderInit();
  eventInit();

  calcCart();

  flashSale();
  recommendSale();
}

main();
