import AddCartButton from './AddCartButton';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import SelectProduct from './SelectProduct';
import StockQuantityStatus from './StockQuantityStatus';

function Cart() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItems />
        <CartTotal />
        <SelectProduct />
        <AddCartButton />
        <StockQuantityStatus />
      </div>
    </div>
  );
}

export default Cart;
