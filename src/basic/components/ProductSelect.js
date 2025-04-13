import { renderCreateElement } from '../renderUtils';

export const productSelectElement = renderCreateElement('select', {
  id: 'product-select',
  className: 'border rounded p-2 mr-2',
});
