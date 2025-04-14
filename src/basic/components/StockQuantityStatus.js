import { productState } from '../utils';
import { createElement } from '../utils/elementUtils';

export const stockQuantityStatusElement = createElement('div', {
  id: 'stock-status',
  className: 'text-sm text-gray-500 mt-2',
});

export const updateStockStatus = () => {
  const products = productState.getProducts();
  let stockStatusMessage = '';
  const limitStockQuantity = 5;

  products.forEach((product) => {
    const almostSoldOut = product.quantity < limitStockQuantity;

    if (almostSoldOut) {
      const soldOut = product.quantity === 0;

      stockStatusMessage = `${product.name}: ${soldOut ? '품절' : '재고 부족 (' + product.quantity + '개 남음)'}`;
    }
  });

  stockQuantityStatusElement.textContent = stockStatusMessage;
};
