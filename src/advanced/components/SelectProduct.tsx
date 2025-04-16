import { useCallback, useState } from 'react';
import { useProduct } from '../provider/ProductProvider';
import { useCart } from '../provider/CartProvider';

function SelectProduct() {
  const { products, stockDecrease, getFindProduct } = useProduct();

  const { isSelectedProduct, createCartItem, addCartItem } = useCart();
  const [selectedItemId, setSelectedItemId] = useState<string>(products[0].id);

  const handleAddItemClick = useCallback(() => {
    const addItem = getFindProduct(selectedItemId);
    const isAvailableQuantity = (addItem?.quantity ?? 0) > 0;

    // 선택한 상품이 없는 경우
    if (!addItem) return;

    // 재고가 없는 경우
    if (!isAvailableQuantity) {
      alert('재고가 부족합니다.');
      return;
    }

    // 장바구니에 이미 존재하는 상품인 경우
    if (isSelectedProduct(selectedItemId)) {
      addCartItem(selectedItemId);
      stockDecrease(selectedItemId);
      return;
    }

    // 장바구니에 상품 생성
    createCartItem({
      id: addItem.id,
      name: addItem.name,
      price: addItem.price,
      quantity: 1,
    });

    // 재고 감소
    stockDecrease(selectedItemId);
  }, [getFindProduct, isSelectedProduct, selectedItemId]);

  return (
    <>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        onChange={(e) => setSelectedItemId(e.target.value)}
      >
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

      <button
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddItemClick}
      >
        추가
      </button>
    </>
  );
}

export default SelectProduct;
