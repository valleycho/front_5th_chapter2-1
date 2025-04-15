import { Product } from '../provider/ProductProvider';

interface SelectProductProps {
  products: Product[];
}

function SelectProduct({ products }: SelectProductProps) {
  return (
    <select id="product-select" className="border rounded p-2 mr-2">
      {products.map((product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.quantity === 0}
        >
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
}

export default SelectProduct;
