import { useCart } from '../provider/CartProvider';

function CartTotal() {
  const cartState = useCart();

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {Math.round(cartState.cartTotalAmount)}원
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {cartState.point})
      </span>
    </div>
  );
}

export default CartTotal;
