import { createContext, useCallback, useContext, useState } from 'react';
import { Product, useProduct } from './ProductProvider';
import {
  getDiscountRate,
  getProductDiscountRate,
} from '../utils/discountUtils';

interface Cart {
  discountRate: number;
  cartItemTotalQuantity: number;
  cartTotalPrice: number;
  selectedCartItems: Product[];
}

interface ICartContext {
  cartState: Cart;
  isSelectedCartItem: (productId: string) => boolean;
  createCartItem: (addItem: Product) => void;
  addCartItem: (productId: string) => void;
  decreaseCartItem: (productId: string) => void;
  removeCartItem: (targetProduct: Product) => void;
  selectedItemId: string;
  setSelectedItemId: (productId: string) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({
    discountRate: 0,
    cartItemTotalQuantity: 0,
    cartTotalPrice: 0,
    selectedCartItems: [],
  });
  const [selectedItemId, setSelectedItemId] = useState<string>('p1');

  const { stockDecrease, getFindProduct, stockIncrease } = useProduct();

  const createCartItem = useCallback((addItem: Product) => {
    setCartState((prev) => ({
      ...prev,
      cartItemTotalQuantity: prev.cartItemTotalQuantity + 1,
      cartTotalPrice: prev.cartTotalPrice + addItem.price,
      selectedCartItems: [...prev.selectedCartItems, addItem],
    }));

    stockDecrease(addItem.id);
  }, []);

  const addCartItem = useCallback(
    (productId: string) => {
      const targetProduct = getFindProduct(productId);
      const isAvailableQuantity = (targetProduct?.quantity ?? 0) > 0;

      const targetCartItem = cartState.selectedCartItems.find(
        (item) => item.id === productId,
      );

      if (!isAvailableQuantity) {
        alert('재고가 부족합니다.');
        return;
      }

      const updatedQuantity = (targetCartItem?.quantity ?? 0) + 1;
      const discountRate = getDiscountRate(
        updatedQuantity,
        targetCartItem!.id,
        cartState.cartTotalPrice,
        targetCartItem!.price * updatedQuantity,
      );

      setCartState((prev) => {
        const updatedItems = prev.selectedCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );

        const newTotalPrice = updatedItems.reduce((total, item) => {
          const itemDiscountRate = getDiscountRate(
            item.quantity,
            item.id,
            total,
            item.price * item.quantity,
          );
          return total + item.price * item.quantity * (1 - itemDiscountRate);
        }, 0);

        return {
          ...prev,
          discountRate,
          cartItemTotalQuantity: prev.cartItemTotalQuantity + 1,
          cartTotalPrice: newTotalPrice,
          selectedCartItems: updatedItems,
        };
      });

      stockDecrease(productId);
    },
    [getFindProduct, stockDecrease],
  );

  const decreaseCartItem = useCallback(
    (productId: string) => {
      const targetCartItem = cartState.selectedCartItems.find(
        (product) => product.id === productId,
      );

      if (targetCartItem!.quantity <= 1) {
        removeCartItem(targetCartItem!);
        return;
      }

      const updatedQuantity = targetCartItem!.quantity - 1;
      const discountRate = getDiscountRate(
        updatedQuantity,
        targetCartItem!.id,
        cartState.cartTotalPrice,
        targetCartItem!.price * updatedQuantity,
      );

      setCartState((prev) => {
        const updatedItems = prev.selectedCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );

        const newTotalPrice = updatedItems.reduce((total, item) => {
          const itemDiscountRate = getDiscountRate(
            item.quantity,
            item.id,
            total,
            item.price * item.quantity,
          );
          return total + item.price * item.quantity * (1 - itemDiscountRate);
        }, 0);

        return {
          ...prev,
          discountRate,
          cartItemTotalQuantity: prev.cartItemTotalQuantity - 1,
          cartTotalPrice: newTotalPrice,
          selectedCartItems: updatedItems,
        };
      });

      stockIncrease(productId);
    },
    [getFindProduct, stockIncrease],
  );

  const removeCartItem = useCallback((targetProduct: Product) => {
    setCartState((prev) => {
      const updatedItems = prev.selectedCartItems.filter(
        (item) => item.id !== targetProduct.id,
      );

      const newTotalPrice = updatedItems.reduce((total, item) => {
        const itemDiscountRate = getDiscountRate(
          item.quantity,
          item.id,
          total,
          item.price * item.quantity,
        );
        return total + item.price * item.quantity * (1 - itemDiscountRate);
      }, 0);

      return {
        ...prev,
        cartItemTotalQuantity:
          prev.cartItemTotalQuantity - targetProduct.quantity,
        cartTotalPrice: newTotalPrice,
        selectedCartItems: updatedItems,
      };
    });
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
        selectedItemId,
        setSelectedItemId,
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
