"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart } = useCart();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white shadow-xl">
              <div className="flex flex-col h-full overflow-y-scroll">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <DialogTitle className="text-lg font-medium">Shopping Cart</DialogTitle>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <ul>
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <p>{item.title}</p>
                          <p>${item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
                    Close
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

