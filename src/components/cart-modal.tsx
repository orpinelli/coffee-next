import { useCart } from "@/context/cart-context";
import { useEffect } from "react";

export function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

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
    <div className="fixed inset-0  flex justify-end items-start pt-20 pr-4 z-99">
      <div className="modal-content relative bg-zinc-200 p-4 rounded shadow-lg w-[400px] z-50">
        <h2 className="text-xl font-bold mb-4 text-black">Carrinho</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-black">X</button>
        <ul>
          {items.length === 0 ? (
            <li className="text-black">Seu carrinho está vazio.</li>
          ) : (
            items.map((item) => (
              <li key={item.productId} className="flex justify-between items-center text-black mb-2">
                <span>{item.title}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="bg-red-500 px-2 rounded text-white"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
