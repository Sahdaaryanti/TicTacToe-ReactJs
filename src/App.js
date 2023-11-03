import * as React from 'react';
import './index.css';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[square] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <button className="bg-red-100 border-2 border-gray-600 font-normal mr-[-2px] mt-[-1px] p-5 text-3xl w-16 h-16" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

return (
  <div className="flex flex-col items-center mt-10">
    <div className="status text-black p-4 inline-block font-semibold text-lg">
      {status}
    </div>
    <div className="board-row flex justify-center">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div className="board-row flex justify-center">
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div className="board-row flex justify-center">
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
    <button className="restart-button bg-blue-500 text-white p-4 mt-10 rounded" onClick={restart}>
      Restart
    </button>
  </div>
);
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
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
    [2, 4, 6],
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
