import { useCart } from "@/context/cart-context";
import { useEffect } from "react";

export function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items } = useCart();

  if (!isOpen) return null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as Element).closest(".modal-content") === null) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start pt-20 pr-4">
      <div className="modal-content relative bg-white p-4 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-black">Carrinho</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-black">X</button>
        <ul>
          {items.length === 0 ? (
            <li className="text-black">Seu carrinho está vazio.</li>
          ) : (
            items.map((item) => (
              <li key={item.productId} className="flex justify-between text-black">
                <span>Nome: {item.title}</span>
                <span>Quantidade: {item.quantity}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
