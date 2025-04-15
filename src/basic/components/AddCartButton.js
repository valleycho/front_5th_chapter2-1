import { selectedProductState, updateCart, productState } from '../utils';
import { createElement } from '../utils/elementUtils';
import { selectProductElement, cartItemsElement } from '../components';

export const addCartButtonElement = createElement('button', {
  id: 'add-to-cart',
  className: 'bg-blue-500 text-white px-4 py-2 rounded',
  textContent: '추가',
});

function addNewCartItem(itemToAdd) {
  const newItem = createElement('div', {
    id: itemToAdd.id,
    className: 'flex justify-between items-center mb-2',
    innerHTML: `
        <span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `,
  });

  cartItemsElement.appendChild(newItem);
}

export function handleAddCartButtonClick() {
  const selectedItem = selectProductElement.value;

  const addItem = productState.getFindProduct(selectedItem);
  const isAvailableQuantity = (addItem?.quantity ?? 0) > 0;

  if (!isAvailableQuantity) return;

  const itemElement = document.getElementById(addItem.id);
  if (itemElement) {
    const addQuantity =
      parseInt(itemElement.querySelector('span').textContent.split('x ')[1]) +
      1;

    if (addQuantity <= addItem.quantity) {
      itemElement.querySelector('span').textContent =
        `${addItem.name} - ${addItem.price}원 x ${addQuantity}`;

      addItem.quantity--;
    } else {
      alert('재고가 부족합니다.');
    }
  } else {
    addNewCartItem(addItem);

    addItem.quantity--;
  }

  updateCart();

  selectedProductState.setSelectedProduct(selectedItem);
}
