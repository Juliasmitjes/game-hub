import { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import type { IconBaseProps } from "react-icons";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

// ---- TYPES ----
type Action = "rock" | "paper" | "scissors";
type Winner = -1 | 0 | 1;

// ---- CONSTANTS ----
const actions: Record<Action, Action> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const text: Record<Winner, string> = {
  [-1]: "You win!",
  [0]: "It's a tie!",
  [1]: "You lose!",
};

// ---- FUNCTIONS ----
function randomAction(): Action {
  const keys = Object.keys(actions) as Action[];
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function calculateWinner(action1: Action, action2: Action): Winner {
  if (action1 === action2) return 0;
  else if (actions[action1] === action2) return -1;
  else return 1;
}

// ---- COMPONENTS ----
type ActionIconProps = {
  action: Action;
} & IconBaseProps;

function ActionIcon({ action, ...props }: ActionIconProps) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  } as const;

  const Icon = icons[action];
  return <Icon {...props} />;
}

type PlayerProps = {
  name?: string;
  score?: number;
  action?: Action;
};

function Player({ action = "rock" }: PlayerProps) {
  return (
    <div className="flex flex-col items-center justify-items-center font-myText w-32 h-32">
      {action && <ActionIcon action={action} size={60} className="text-primary" />}
    </div>
  );
}

type ActionButtonProps = {
  action: Action;
  onActionSelected: (action: Action) => void;
};

function ActionButton({ action, onActionSelected }: ActionButtonProps) {
  return (
    <Button
      className="h-32 flex flex-col gap-3 hover:scale-105 transition-all duration-300 hover:bg-primary/20 text-primary-foreground border-2 cursor-pointer"
      variant="outline"
      onClick={() => onActionSelected(action)}
    >
      <ActionIcon action={action} className="!w-10 !h-10" />
    </Button>
  );
}

function ShowWinner({ winner = 0 }: { winner?: Winner }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-background text-center">
      {text[winner]}
    </h2>
  );
}

// ---- MAIN COMPONENT ----
function Rps() {
  const [playerAction, setPlayerAction] = useState<Action>("rock");
  const [computerAction, setComputerAction] = useState<Action>("rock");

  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [winner, setWinner] = useState<Winner>(0);

  const onActionSelected = (selectedAction: Action) => {
    setPlayerAction(selectedAction);

    const newComputerAction = randomAction();
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);

    if (newWinner === -1) setPlayerScore((prev) => prev + 1);
    else if (newWinner === 1) setComputerScore((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-accent to-primary p-4 md:p-8">
       <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>
    

        <Card className="mb-8 border-2 shadow-[var(--shadow-game)] bg-background/30">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rock Paper Scissors
            </CardTitle>
          </CardHeader>
        <CardContent>

          <div className="flex justify-center gap-12 mb-8">
            {/* Player column */}
            <div className="flex flex-col items-center text-center w-40">
              <p className="text-md lg:text-lg font-bold text-muted-foreground mb-1 mt-5">You</p>
              <p className="text-3xl font-bold text-primary mb-10">{playerScore}</p>
              <Player name="Player" action={playerAction} />
            </div>

            {/* Computer column */}
            <div className="flex flex-col items-center text-center w-40">
              <p className="text-md lg:text-lg font-bold text-muted-foreground mb-1 mt-5">Computer</p>
              <p className="text-3xl font-bold text-secondary mb-10">{computerScore}</p>
              <Player name="Computer" action={computerAction} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <ActionButton action="rock" onActionSelected={onActionSelected} />
            <ActionButton action="paper" onActionSelected={onActionSelected} />
            <ActionButton action="scissors" onActionSelected={onActionSelected} />
          </div>
        
        <ShowWinner winner={winner} />         
        </CardContent>
      </Card>
      </div> 
    </div>
  );
}

export default Rps;
