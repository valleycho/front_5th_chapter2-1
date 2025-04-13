import { cartItemsElement, cartTotalElement } from './components/Cart';
import { renderUpdatePoint } from './components/Point';
import { updateStockStatus } from './components/StockQuantityStatus';
import { productState } from './productUtils';

export function calcCart() {
  const products = productState.getProducts();

  let [point, cartTotalAmount, cartItemQuantity, subTot] = [0, 0, 0, 0];

  let cartItems = cartItemsElement.children;

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

  updateStockStatus();

  renderUpdatePoint(point, cartTotalAmount);
}
