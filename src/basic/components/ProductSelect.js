import { renderCreateElement } from '../renderUtils';
import { productState } from '../productUtils';

export const productSelectElement = renderCreateElement('select', {
  id: 'product-select',
  className: 'border rounded p-2 mr-2',
});

export const renderProductSelectOptions = () => {
  const products = productState.getProducts();

  productSelectElement.innerHTML = '';

  products.forEach((product) => {
    const optionElement = renderCreateElement('option', {
      value: product.id,
      textContent: `${product.name} - ${product.price}원`,
    });

    if (product.quantity === 0) optionElement.disabled = true;

    productSelectElement.appendChild(optionElement);
  });
};
