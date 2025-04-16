import { createContext, useCallback, useContext, useState } from 'react';
import { Product, useProduct } from './ProductProvider';

interface Cart {
  discountRate: number;
  cartItemQuantity: number;
  cartTotalAmount: number;
  subTotalPrice: number;
  point: number;
  selectedCartItems: Product[];
}

interface ICartContext {
  cartState: Cart;
  isSelectedCartItem: (productId: string) => boolean;
  createCartItem: (addItem: Product) => void;
  addCartItem: (productId: string) => void;
  decreaseCartItem: (productId: string) => void;
  removeCartItem: (productId: string) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({
    discountRate: 0,
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    subTotalPrice: 0,
    point: 0,
    selectedCartItems: [],
  });

  const { stockDecrease, getFindProduct } = useProduct();

  const createCartItem = useCallback((addItem: Product) => {
    setCartState((prev) => ({
      ...prev,
      selectedCartItems: [...prev.selectedCartItems, addItem],
    }));

    stockDecrease(addItem.id);
  }, []);

  const addCartItem = useCallback(
    (productId: string) => {
      const targetCartItem = getFindProduct(productId);
      const isAvailableQuantity = (targetCartItem?.quantity ?? 0) > 0;

      if (!isAvailableQuantity) {
        alert('재고가 부족합니다.');
        return;
      }

      setCartState((prev) => ({
        ...prev,
        selectedCartItems: prev.selectedCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }));

      stockDecrease(productId);
    },
    [getFindProduct, stockDecrease],
  );

  const decreaseCartItem = useCallback((productId: string) => {
    const targetCartItem = cartState.selectedCartItems.find(
      (product) => product.id === productId,
    );
    console.log({
      targetCartItem,
      productId,
    });

    if (targetCartItem!.quantity <= 1) {
      removeCartItem(productId);
      return;
    }

    setCartState((prev) => ({
      ...prev,
      selectedCartItems: prev.selectedCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    }));
  }, []);

  const removeCartItem = useCallback((productId: string) => {
    setCartState((prev) => ({
      ...prev,
      selectedCartItems: prev.selectedCartItems.filter(
        (item) => item.id !== productId,
      ),
    }));
  }, []);

  const isSelectedCartItem = useCallback(
    (productId: string) => {
      return cartState.selectedCartItems.some(
        (product) => product.id === productId,
      );
    },
    [cartState.selectedCartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartState,
        isSelectedCartItem,
        createCartItem,
        addCartItem,
        decreaseCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
