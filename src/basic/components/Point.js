import { createElement } from '../utils';
import { cartTotalElement } from './Cart';

export const renderUpdatePoint = (point, cartTotalAmount) => {
  point = Math.floor(cartTotalAmount / 1000);

  let pointElement = document.getElementById('loyalty-points');

  if (!pointElement) {
    pointElement = createElement('span', {
      id: 'loyalty-points',
      className: 'text-blue-500 ml-2',
    });

    cartTotalElement.appendChild(pointElement);
  }

  pointElement.textContent = `(포인트: ${point})`;
};
