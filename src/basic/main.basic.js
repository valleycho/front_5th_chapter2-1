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
import { renderCreateElement } from './renderUtils';
import { productState } from './productUtils';
import { calcCart } from './cartUtils';

let products = productState.getProducts();
let selectedProduct;

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
  addCartButtonElement.addEventListener('click', function () {
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

      selectedProduct = selItem;
    }
  });

  cartItemsElement.addEventListener('click', function (event) {
    var tgt = event.target;

    if (
      tgt.classList.contains('quantity-change') ||
      tgt.classList.contains('remove-item')
    ) {
      var prodId = tgt.dataset.productId;
      var itemElem = document.getElementById(prodId);
      var prod = products.find(function (p) {
        return p.id === prodId;
      });

      if (tgt.classList.contains('quantity-change')) {
        var qtyChange = parseInt(tgt.dataset.change);
        var newQty =
          parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
          qtyChange;

        if (
          newQty > 0 &&
          newQty <=
            prod.quantity +
              parseInt(
                itemElem.querySelector('span').textContent.split('x ')[1],
              )
        ) {
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] +
            'x ' +
            newQty;
          prod.quantity -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.quantity -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (tgt.classList.contains('remove-item')) {
        var remQty = parseInt(
          itemElem.querySelector('span').textContent.split('x ')[1],
        );
        prod.quantity += remQty;
        itemElem.remove();
      }

      calcCart();
    }
  });
}

function main() {
  renderInit();
  eventInit();

  calcCart();

  flashSale();
  recommendSale();
}

main();
