import { productState } from '../utils';
import { createElement } from '../utils/elementUtils';

export const productSelectElement = createElement('select', {
  id: 'product-select',
  className: 'border rounded p-2 mr-2',
});

export const updateOptionElement = () => {
  productSelectElement.innerHTML = '';

  const products = productState.getProducts();

  products.forEach((product) => {
    const optionElement = createElement('option', {
      value: product.id,
      textContent: `${product.name} - ${product.price}원`,
    });

    if (product.quantity === 0) {
      optionElement.disabled = true;
    }

    productSelectElement.appendChild(optionElement);
  });
};
