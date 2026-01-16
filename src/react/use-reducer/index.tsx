import { MOCKED_PRODUCTS } from "@/data";
import { useReducer, useState, type FormEvent } from "react";
import { cartReducer } from "./cart-reducer";

const ReactUseReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = MOCKED_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    dispatch({ type: "ADD_ITEM", product, quantity });
    setProductId("");
    setQuantity(1);
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <h2>
        ⚛️ React • <i>useReducer</i>
      </h2>

      <h3>Add item</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <select
          onChange={(e) => setProductId(e.target.value)}
          required
          value={productId}
        >
          <option value="">Select product</option>
          {MOCKED_PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ${p.price}
            </option>
          ))}
        </select>

        <input
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          value={quantity}
        />

        <button disabled={productId === ""} type="submit">
          Add to Cart
        </button>
      </form>

      <h3>Cart Items</h3>
      {state.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {state.items.map((item) => (
              <li
                key={item.id}
                style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
              >
                <b>{item.name}</b> ${item.price} x {item.quantity} = $
                {item.price * item.quantity}
                <button
                  onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
            Clear Cart
          </button>
        </>
      )}
    </>
  );
};

export default ReactUseReducer;
