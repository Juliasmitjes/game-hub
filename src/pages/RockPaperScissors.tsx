import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Hand, Scissors, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


type Choice = "rock" | "paper" | "scissors" | null;

const choices = [
  { value: "rock" as const, icon: Hand, label: "Rock" },
  { value: "paper" as const, icon: FileText, label: "Paper" },
  { value: "scissors" as const, icon: Scissors, label: "Scissors" },
];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>("");
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const getWinner = (player: Choice, computer: Choice): string => {
    if (!player || !computer) return "";
    if (player === computer) return "draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "player";
    }
    return "computer";
  };

  const play = (choice: Choice) => {
    const computerPlay = choices[Math.floor(Math.random() * choices.length)].value;
    setPlayerChoice(choice);
    setComputerChoice(computerPlay);

    const winner = getWinner(choice, computerPlay);
    
    if (winner === "player") {
      setResult("You Win! 🎉");
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      // toast.success("You won this round!");
    } else if (winner === "computer") {
      setResult("Computer Wins! 😢");
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      // toast.error("Computer won this round!");
    } else {
      setResult("It's a Draw! 🤝");
      // toast.info("It's a tie!");
    }
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

        <Card className="mb-8 border-2 shadow-[var(--shadow-game)]">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rock Paper Scissors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">You</p>
                <p className="text-3xl font-bold text-primary">{score.player}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Computer</p>
                <p className="text-3xl font-bold text-secondary">{score.computer}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {choices.map(({ value, icon: Icon, label }) => (
                <Button
                  key={value}
                  onClick={() => play(value)}
                  variant="outline"
                  className="h-32 flex flex-col gap-3 hover:scale-105 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-2"
                >
                  <Icon className="w-12 h-12" />
                  <span className="font-semibold">{label}</span>
                </Button>
              ))}
            </div>

            {result && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4">{result}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 rounded-2xl bg-primary/10">
                    <p className="text-sm text-muted-foreground mb-3">Your Choice</p>
                    {playerChoice && (
                      <div className="flex flex-col items-center gap-2">
                        {choices.find(c => c.value === playerChoice)?.icon && (
                          (() => {
                            const Icon = choices.find(c => c.value === playerChoice)!.icon;
                            return <Icon className="w-16 h-16 text-primary" />;
                          })()
                        )}
                        <p className="font-semibold capitalize">{playerChoice}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-secondary/10">
                    <p className="text-sm text-muted-foreground mb-3">Computer's Choice</p>
                    {computerChoice && (
                      <div className="flex flex-col items-center gap-2">
                        {choices.find(c => c.value === computerChoice)?.icon && (
                          (() => {
                            const Icon = choices.find(c => c.value === computerChoice)!.icon;
                            return <Icon className="w-16 h-16 text-secondary" />;
                          })()
                        )}
                        <p className="font-semibold capitalize">{computerChoice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RockPaperScissors;
