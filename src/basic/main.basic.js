import { getProducts } from './productsUtils';
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
import {
  addCartButtonElement,
  addCartButtonClickEvent,
} from './components/AddCartButton';
import {
  stockQuantityStatusElement,
  updateStockStatus,
} from './components/StockQuantityStatus';
import { renderUpdatePoint } from './components/Point';
import { renderCreateElement } from './renderUtils';

let products, selectedProduct;

let point,
  cartTotalAmount,
  cartItemQuantity = 0;

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
  renderProductSelectOptions(products);
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
  products = getProducts();

  renderInit();
  eventInit();

  calcCart();

  flashSale();
  recommendSale();
}

function calcCart() {
  cartTotalAmount = 0;
  cartItemQuantity = 0;
  var cartItems = cartItemsElement.children;
  var subTot = 0;

  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;

      for (var j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }
      var q = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1],
      );
      var itemTot = curItem.price * q;
      var disc = 0;
      cartItemQuantity += q;
      subTot += itemTot;

      if (q >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      cartTotalAmount += itemTot * (1 - disc);
    })();
  }

  let discRate = 0;

  if (cartItemQuantity >= 30) {
    var bulkDisc = cartTotalAmount * 0.25;
    var itemDisc = subTot - cartTotalAmount;

    if (bulkDisc > itemDisc) {
      cartTotalAmount = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - cartTotalAmount) / subTot;
    }
  } else {
    discRate = (subTot - cartTotalAmount) / subTot;
  }

  if (new Date().getDay() === 2) {
    cartTotalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  cartTotalElement.textContent = '총액: ' + Math.round(cartTotalAmount) + '원';

  if (discRate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    cartTotalElement.appendChild(span);
  }

  updateStockStatus(products);

  renderUpdatePoint(point, cartTotalAmount);
}

main();
