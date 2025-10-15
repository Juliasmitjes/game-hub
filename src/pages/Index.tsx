import GameCard from "../components/GameCard";
import { Hand, Brain, Grid3x3 } from "lucide-react";
import heroImage from "../assets/background.jpg";

const Index = () => {
  const games = [
    {
      title: "Rock Paper Scissors",
      description: "A classic, beat the computer",
      icon: Hand,
      path: "/rock-paper-scissors",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Memory Game",
      description: "Match pairs and train your memory",
      icon: Brain,
      path: "/memory",
      gradient: "linear-gradient(135deg, hsl(340 82% 62%) 0%, hsl(262 83% 58%) 100%)",
    },
    {
      title: "Tic Tac Toe",
      description: "A strategic challenge",
      icon: Grid3x3,
      path: "/tic-tac-toe",
      gradient: "linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(340 82% 62%) 100%)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
          <div 
            className="relative h-[400px] bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-foreground/70 to-background" />
            
            {/* overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-b from-transparent to-background"></div>

            <div className="relative z-10 text-center px-4">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
                Game Hub
              </h1>
              <p className="text-xl md:text-2xl text-background max-w-2xl mx-auto animate-fade-in">
                Choose your game and have fun!
              </p>
            </div>
          </div>

      {/* Games Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.path} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
