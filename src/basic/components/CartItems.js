import { createElement } from '../utils/elementUtils';
import { productState, updateCart } from '../utils';

export const cartItems = {
  $element: null,
  render() {
    const cartItemsElement = createElement('div', {
      id: 'cart-items',
    });

    this.$element = cartItemsElement;
    this.$element.addEventListener('click', (event) =>
      this.handleCartItemsClick(event),
    );

    return this.$element;
  },
  getElement() {
    return this.$element;
  },
  addNewCartItem(itemToAdd) {
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

    this.$element.appendChild(newItem);
  },
  removeCartItem(targetProductElement, targetProduct) {
    const remainQuantity = parseInt(
      targetProductElement.querySelector('span').textContent.split('x ')[1],
    );

    targetProduct.quantity += remainQuantity;
    targetProductElement.remove();
  },
  changeCartItemQuantity(eventTarget, targetProductElement, targetProduct) {
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
            targetProductElement
              .querySelector('span')
              .textContent.split('x ')[1],
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
  },
  handleCartItemsClick(event) {
    const eventTarget = event.target;
    const targetProductId = eventTarget.dataset.productId;
    const targetProduct = productState.getFindProduct(targetProductId);
    const targetProductElement = document.getElementById(targetProductId);

    if (eventTarget.classList.contains('quantity-change')) {
      this.changeCartItemQuantity(
        eventTarget,
        targetProductElement,
        targetProduct,
      );
    }

    if (eventTarget.classList.contains('remove-item')) {
      this.removeCartItem(targetProductElement, targetProduct);
    }

    updateCart();
  },
};
