import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";


type Player = "X" | "O" | null;

const Tictactoe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });
  const [gameOver, setGameOver] = useState(false);
  
  const winningCombinaties = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rijen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolomen
    [0, 4, 8], [2, 4, 6] // diagonaal
  ];

  const checkWinner = (currentBoard: Player[]): Player => {
    for (const [a, b, c] of winningCombinaties) {
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const isBoardFull = (currentBoard: Player[]): boolean => {
    return currentBoard.every(cell => cell !== null);
  };

  const getComputerMove = (currentBoard: Player[]): number => {
  const available = currentBoard
    .map((cell, i) => (cell === null ? i : -1))
    .filter(i => i !== -1);

  return available[Math.floor(Math.random() * available.length)];
};

const handleClick = (index: number) => {

  if (board[index] || !isPlayerTurn || gameOver) return;

  const newBoard = [...board];
  newBoard[index] = "X";
  setBoard(newBoard);

  if (checkWinner(newBoard)) return endGame("player");
  if (isBoardFull(newBoard)) return endGame("draw");

  setIsPlayerTurn(false);

  setTimeout(() => {
    const move = getComputerMove(newBoard);
    newBoard[move] = "O";
    setBoard([...newBoard]);

    if (checkWinner(newBoard)) return endGame("computer");
    if (isBoardFull(newBoard)) return endGame("draw");

    setIsPlayerTurn(true);
  }, 500);
};

const endGame = (winner: "player" | "computer" | "draw") => {
  setGameOver(true);
  setScore(prev => ({
    ...prev,
    [winner]: prev[winner] + 1
  }));
};

 const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  const getCellColor = (cell: Player) => {
    if (cell === "X") return "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground";
    if (cell === "O") return "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground";
    return "bg-accent border-2  shadow-lg border-2 transition-all duration-300 hover:bg-primary/20  hover:scale-105";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-accent to-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>
        
        <Card className="mb-8 border-2 shadow-[var(--shadow-game)] bg-background/30">
          <CardHeader className="flex justify-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
              Tic Tac Toe
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center gap-8 mb-8 w-full">
              <div className="text-center w-32">
                <p className="text-md font-bold text-muted-foreground mb-2">You (X)</p>
                <p className="text-3xl font-bold text-primary">{score.player}</p>
              </div>
              <div className="text-center w-32">
                <p className="text-md font-bold text-muted-foreground mb-2">Draws</p>
                <p className="text-3xl font-bold text-muted-foreground">{score.draw}</p>
              </div>
              <div className="text-center w-32">
                <p className="text-md font-bold text-muted-foreground mb-2">Computer (O)</p>
                <p className="text-3xl font-bold text-secondary">{score.computer}</p>
              </div>
            </div>

         <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square rounded-2xl text-5xl font-bold transition-all duration-300 ${getCellColor(cell)} ${
                !cell && isPlayerTurn && !gameOver ? "hover:scale-105 cursor-pointer" : ""
              } ${!isPlayerTurn && !gameOver ? "cursor-not-allowed" : ""}`}
              disabled={!!cell || !isPlayerTurn || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>

       <div className="flex justify-center">
        <Button
          onClick={resetGame}
          className="mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          New Game
        </Button>
      </div>  
    </CardContent>
    </Card>
  </div>
</div>
  );
  
}



export default Tictactoe