"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { CartModal } from "@/components/cart-modal";

interface CartItems {
  productId: number;
  title: string;
  quantity: number;
}

interface CartContextType {
  items: CartItems[];
  addToCart: (productId: number, title: string) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  openCartModal: () => void;
  closeCartModal: () => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addToCart(productId: number, title: string) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId);

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...state, { productId, title, quantity: 1 }];
      }
    });
    setIsModalOpen(true);
  }

  function increaseQuantity(productId: number) {
    setCartItems((state) =>
      state.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCartItems((state) =>
      state
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCartItems((state) => state.filter((item) => item.productId !== productId));
  }

  function openCartModal() {
    setIsModalOpen(true);
  }

  function closeCartModal() {
    setIsModalOpen(false);
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        openCartModal,
        closeCartModal,
      }}
    >
      {children}
      {isModalOpen && <CartModal isOpen={isModalOpen} onClose={closeCartModal} />}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
