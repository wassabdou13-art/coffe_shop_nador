import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: {
    size: string;
    sugar: number;
    addons: string[];
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, customizationStr?: string) => void;
  updateQuantity: (id: string, customizationStr: string | undefined, delta: number) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.customization) === JSON.stringify(newItem.customization)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...currentItems, newItem];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string, customizationStr?: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.id === id && JSON.stringify(item.customization) === customizationStr)
      )
    );
  };

  const updateQuantity = (id: string, customizationStr: string | undefined, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id && JSON.stringify(item.customization) === customizationStr) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within CartProvider");
  return context;
};
