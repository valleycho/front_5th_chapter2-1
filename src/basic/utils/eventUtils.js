import { addCartButtonElement } from '../components/AddCartButton';
import { cartItemsElement } from '../components/Cart';
import { handleAddCartButtonClick } from '../components/AddCartButton';
import { handleCartItemsClick } from '../components/Cart';

export function eventInit() {
  addCartButtonElement.addEventListener('click', handleAddCartButtonClick);
  cartItemsElement.addEventListener('click', handleCartItemsClick);
}
