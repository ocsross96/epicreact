// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function Board({ selectSquare, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextValue = calculateNextValue(history[currentStep]);
  const winner = calculateWinner(history[currentStep]);
  const status = calculateStatus(winner, history[currentStep], nextValue);

  function selectSquare(square) {
    if (winner || history[currentStep][square] || currentStep !== history.length - 1) {
      return;
    }

    const squaresCopy = [...history[currentStep]];
    squaresCopy[square] = nextValue;

    setHistory((prevHistory) => {
      return [...prevHistory, squaresCopy];
    });
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function back() {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
  }

  function forward() {
    if (currentStep === history.length - 1) {
      return;
    }
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={history[currentStep]} />
        <button className="restart" onClick={restart}>
          restart
        </button>
        <button className="restart" onClick={back}>
          back
        </button>
        <button className="restart" onClick={forward}>
          forward
        </button>
        <div className="game-info">
          <div>{status}</div>
          <div>
            Current step {currentStep} out of {history.length - 1}
          </div>
          {/* <ol>{moves}</ol> */}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's game` : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter((r) => r === 'X').length;
  const oSquaresCount = squares.filter((r) => r === 'O').length;
  return oSquaresCount === xSquaresCount ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
