import { productState, updateCart } from '../utils';
import { createElement } from '../utils/elementUtils';

export const cartWrapperElement = createElement('div', {
  className: 'bg-gray-100 p-8',
});

export const cartContentElement = createElement('div', {
  className:
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
});

export const cartText = createElement('h1', {
  className: 'text-2xl font-bold mb-4',
  textContent: '장바구니',
});

export const cartItemsElement = createElement('div', {
  id: 'cart-items',
});

export const cartTotalElement = createElement('div', {
  id: 'cart-total',
  className: 'text-xl font-bold my-4',
});

function changeCartItemQuantity(
  eventTarget,
  targetProductElement,
  targetProduct,
) {
  var qtyChange = parseInt(eventTarget.dataset.change);
  var newQty =
    parseInt(
      targetProductElement.querySelector('span').textContent.split('x ')[1],
    ) + qtyChange;

  if (
    newQty > 0 &&
    newQty <=
      targetProduct.quantity +
        parseInt(
          targetProductElement.querySelector('span').textContent.split('x ')[1],
        )
  ) {
    targetProductElement.querySelector('span').textContent =
      targetProductElement.querySelector('span').textContent.split('x ')[0] +
      'x ' +
      newQty;
    targetProduct.quantity -= qtyChange;
  } else if (newQty <= 0) {
    targetProductElement.remove();
    targetProduct.quantity -= qtyChange;
  } else {
    alert('재고가 부족합니다.');
  }
}

function removeCartItem(targetProductElement, targetProduct) {
  const remainQuantity = parseInt(
    targetProductElement.querySelector('span').textContent.split('x ')[1],
  );

  targetProduct.quantity += remainQuantity;
  targetProductElement.remove();
}

export function handleCartItemsClick(event) {
  const eventTarget = event.target;
  const targetProductId = eventTarget.dataset.productId;
  const targetProduct = productState.getFindProduct(targetProductId);
  const targetProductElement = document.getElementById(targetProductId);

  if (eventTarget.classList.contains('quantity-change')) {
    changeCartItemQuantity(eventTarget, targetProductElement, targetProduct);
  }

  if (eventTarget.classList.contains('remove-item')) {
    removeCartItem(targetProductElement, targetProduct);
  }

  updateCart();
}
