"use client";

import { useCart } from "@/context/cart-context";

interface AddToCartButtonProps {
  productId: number;
  title: string;
}

export function AddToCartButton({ productId, title }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    addToCart(productId, title);
  }

  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-orange-500 font-semibold text-white"
    >
      Adicionar ao Carrinho
    </button>
  );
}
