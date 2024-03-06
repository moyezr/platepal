import { CartItem, Product } from "@/types";
import React, { PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};
export const CartContext = React.createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product_id == product.id && size == item.size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    } else {
      const newItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };

      setItems((prev) => [...prev, newItem]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    console.log(items);
    const updatedItems = items.filter((item) => {
      if (item.id != itemId) return item;
      else {
        if (item.quantity == 1 && amount == -1) return null;
        item.quantity = item.quantity + amount;
        return item;
      }
    });
    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
