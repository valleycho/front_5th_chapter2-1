import { renderCreateElement } from '../renderUtils';
import { productSelectElement } from './productSelect';
import { productState } from '../utils';
import { calcCart } from '../utils/cartUtils';
import { cartItemsElement } from './Cart';
import { selectedProductState } from '../utils';

export const addCartButtonElement = renderCreateElement('button', {
  id: 'add-to-cart',
  className: 'bg-blue-500 text-white px-4 py-2 rounded',
  textContent: '추가',
});

export function handleAddCartButtonClick() {
  const products = productState.getProducts();

  var selItem = productSelectElement.value;

  var itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    var item = document.getElementById(itemToAdd.id);

    if (item) {
      var newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = renderCreateElement('div', {
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
      itemToAdd.quantity--;
    }

    calcCart();

    selectedProductState.setSelectedProduct(selItem);
  }
}
