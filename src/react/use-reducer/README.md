# ⚛️ React • `useReducer`

Shopping cart using reducer pattern for predictable state updates.

📄 https://react.dev/reference/react/useReducer

## 🧩 Classification

React state management, in-memory state

## 🎯 Primary use

Complex state logic, predictable state transitions, local component or app state

### ⏱️ When to Use

- complex component state
- state machines
- forms
- multi-step flows
- logic-heavy UI state

## ✅ Pros

- centralized, predictable state updates
- good for complex state logic
- easier debugging and testing (actions describe intent)
- no external dependencies
- works well with TypeScript

## ⚠️ Cons

- boilerplate (actions, reducer)
- state resets on page refresh
- not suitable for persistence without extra logic
- can become verbose for simple state

## 💻 Code

```typescript
import { useReducer } from "react";

type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
```
