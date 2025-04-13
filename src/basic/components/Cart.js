import { renderCreateElement } from '../renderUtils';
import { productState } from '../productUtils';
import { calcCart } from '../cartUtils';

export const cartWrapperElement = renderCreateElement('div', {
  className: 'bg-gray-100 p-8',
});

export const cartContentElement = renderCreateElement('div', {
  className:
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
});

export const cartText = renderCreateElement('h1', {
  className: 'text-2xl font-bold mb-4',
  textContent: '장바구니',
});

export const cartItemsElement = renderCreateElement('div', {
  id: 'cart-items',
});

export const cartTotalElement = renderCreateElement('div', {
  id: 'cart-total',
  className: 'text-xl font-bold my-4',
});

export function handleCartItemsClick(event) {
  const products = productState.getProducts();

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
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
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
}
