import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (currentBoard: Player[]): Player => {
    for (const [a, b, c] of winningCombinations) {
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
    // Simple AI: Try to win, block player, or pick random
    
    // Try to win
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard) === "O") return i;
      }
    }

    // Try to block player
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard) === "X") return i;
      }
    }

    // Pick center if available
    if (!currentBoard[4]) return 4;

    // Pick random available cell
    const available = currentBoard.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1);
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      // toast.success("You won! 🎉");
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
      // toast.info("It's a draw! 🤝");
      return;
    }

    setIsPlayerTurn(false);

    // Computer's turn
    setTimeout(() => {
      const computerMove = getComputerMove(newBoard);
      newBoard[computerMove] = "O";
      setBoard(newBoard);

      const computerWinner = checkWinner(newBoard);
      if (computerWinner) {
        setGameOver(true);
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        // toast.error("Computer won! 😢");
        return;
      }

      if (isBoardFull(newBoard)) {
        setGameOver(true);
        setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
        // toast.info("It's a draw! 🤝");
        return;
      }

      setIsPlayerTurn(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  const getCellColor = (cell: Player) => {
    if (cell === "X") return "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground";
    if (cell === "O") return "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground";
    return "bg-muted hover:bg-muted/80";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>

        <Card className="border-2 shadow-[var(--shadow-game)]">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tic Tac Toe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">You (X)</p>
                <p className="text-3xl font-bold text-primary">{score.player}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Draws</p>
                <p className="text-3xl font-bold text-muted-foreground">{score.draws}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Computer (O)</p>
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

            {!isPlayerTurn && !gameOver && (
              <p className="text-center text-muted-foreground mb-6 animate-pulse">
                Computer is thinking...
              </p>
            )}

            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              New Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicTacToe;
