import { productState } from '../utils';
import { renderCreateElement } from '../renderUtils';

export const productSelectElement = renderCreateElement('select', {
  id: 'product-select',
  className: 'border rounded p-2 mr-2',
});

export const updateOptionElement = () => {
  productSelectElement.innerHTML = '';

  const products = productState.getProducts();

  products.forEach((product) => {
    const optionElement = renderCreateElement('option', {
      value: product.id,
      textContent: `${product.name} - ${product.price}원`,
    });

    if (product.quantity === 0) {
      optionElement.disabled = true;
    }

    productSelectElement.appendChild(optionElement);
  });
};
