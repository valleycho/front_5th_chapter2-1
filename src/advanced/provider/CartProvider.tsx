import { createContext, useCallback, useContext, useState } from 'react';
import { Product } from './ProductProvider';

interface Cart {
  discountRate: number;
  cartItemQuantity: number;
  cartTotalAmount: number;
  subTotalPrice: number;
  point: number;
  selectedProduct: Product[];
}

interface ICartContext {
  cartState: Cart;
  isSelectedProduct: (productId: string) => boolean;
  createCartItem: (addItem: Product) => void;
  addCartItem: (productId: string) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({
    discountRate: 0,
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    subTotalPrice: 0,
    point: 0,
    selectedProduct: [],
  });

  const createCartItem = useCallback((addItem: Product) => {
    setCartState((prev) => ({
      ...prev,
      selectedProduct: [...prev.selectedProduct, addItem],
    }));
  }, []);

  const addCartItem = useCallback((productId: string) => {
    setCartState((prev) => ({
      ...prev,
      selectedProduct: prev.selectedProduct.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  }, []);

  const isSelectedProduct = useCallback(
    (productId: string) => {
      return cartState.selectedProduct.some(
        (product) => product.id === productId,
      );
    },
    [cartState.selectedProduct],
  );

  return (
    <CartContext.Provider
      value={{ cartState, isSelectedProduct, createCartItem, addCartItem }}
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
