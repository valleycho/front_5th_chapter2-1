import { createContext, useContext, useState } from 'react';

export interface Cart {
  discountRate: number;
  cartItemQuantity: number;
  cartTotalAmount: number;
  subTotalPrice: number;
  point: number;
}

const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({
    discountRate: 0,
    cartItemQuantity: 0,
    cartTotalAmount: 0,
    subTotalPrice: 0,
    point: 0,
  });

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
