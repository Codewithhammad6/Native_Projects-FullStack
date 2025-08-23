import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const itemPresent = state.cart.find((i) => i.id === item.id);
      if (itemPresent) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        };
      } else {
        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (item) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== item.id),
    })),

  incementQuantity: (item) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),

  decrementQuantity: (item) =>
    set((state) => {
      const itemPresent = state.cart.find((i) => i.id === item.id);
      if (!itemPresent) return { cart: state.cart };

      if (itemPresent.quantity === 1) {
        return {
          cart: state.cart.filter((i) => i.id !== item.id),
        };
      } else {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
    }),

  cleanCart: () => set({ cart: [] }),
}));

export default useCartStore;
