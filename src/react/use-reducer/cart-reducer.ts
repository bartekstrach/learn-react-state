import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "LOAD_CART"; items: CartItem[] }
  | { type: "CLEAR_CART" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.product.id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          { ...action.product, quantity: action.quantity },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };

    case "LOAD_CART":
      return {
        items: action.items,
      };

    case "CLEAR_CART":
      return {
        items: [],
      };

    default:
      return state;
  }
}
