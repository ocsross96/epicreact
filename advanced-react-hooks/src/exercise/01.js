// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.step };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function Counter({ initialCount = 0, step = 1 }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: initialCount });

  const increment = () => dispatch({ type: 'increment', step });
  return <button onClick={increment}>{state.count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
