import { renderCreateElement } from '../renderUtils';

export const stockQuantityStatusElement = renderCreateElement('div', {
  id: 'stock-status',
  className: 'text-sm text-gray-500 mt-2',
});

export const updateStockStatus = (products) => {
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
