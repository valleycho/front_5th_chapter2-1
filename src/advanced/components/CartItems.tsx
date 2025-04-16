import { useCart } from '../provider/CartProvider';

function CartItems() {
  const { cartState } = useCart();

  return (
    <div id="cart-items">
      {cartState.selectedProduct.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center mb-2"
        >
          <span>
            {product.name} - {product.price}원 x {product.quantity}
          </span>
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={product.id}
              data-change="-1"
            >
              -
            </button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={product.id}
              data-change="1"
            >
              +
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              data-product-id={product.id}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
