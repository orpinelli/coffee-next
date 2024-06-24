"use client";

import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { CartModal } from "./cart-modal";

export function CartWidget() {
  const { items } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (items.length > 0) {
      setIsModalOpen(true);
    }
  }, [items]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center z-50 gap-2 cursor-pointer" onClick={handleOpenModal}>
        <ShoppingBag className="h-4 w-4" />
        <span className="text-sm">Cart ({totalItems})</span>
      </div>
      {isModalOpen && <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}
