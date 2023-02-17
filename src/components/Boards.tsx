import { useEffect, useState } from "react";
import Square from "../components/Square";
type Player = "X" | "O" | "BOTH" | null;

let lineNo: number;
function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top left to bottom right
    [2, 4, 6], // diagonal top right to bottom left
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      lineNo = i;
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
    lineNo = 10;
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  }, [squares]);

  return (
    <div>
      <div className={`line-${lineNo}`}></div>
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
      {winner && winner !== "BOTH" && (
        <p>Congratulations {winner} is winner 🎊🎉</p>
      )}
      {winner && winner === "BOTH" && <p>match tied !!</p>}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
}

export default Board;
