import { renderCreateElement } from '../renderUtils';

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
