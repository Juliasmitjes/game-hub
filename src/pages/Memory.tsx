import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎸", "🎺"];

const Memory = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }, [flippedCards]);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return;
    
    const card = cards.find(c => c.id === id);
    if (card?.isMatched) return;

    setCards(cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards([...flippedCards, id]);
  };

  const checkMatch = () => {
    const [first, second] = flippedCards;
    const firstCard = cards.find(c => c.id === first);
    const secondCard = cards.find(c => c.id === second);

    setMoves(moves + 1);

    if (firstCard?.emoji === secondCard?.emoji) {
      setCards(cards.map(c => 
        c.id === first || c.id === second 
          ? { ...c, isMatched: true } 
          : c
      ));
      setMatches(matches + 1);
      // toast.success("Match found! 🎉");
      setFlippedCards([]);
      
      if (matches + 1 === emojis.length) {
        setTimeout(() => {
          // toast.success(`You won in ${moves + 1} moves! 🏆`);
        }, 500);
      }
    } else {
      // toast.error("No match!");
      setTimeout(() => {
        setCards(cards.map(c => 
          c.id === first || c.id === second 
            ? { ...c, isFlipped: false } 
            : c
        ));
        setFlippedCards([]);
      }, 1000);
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
              Memory Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Moves</p>
                <p className="text-3xl font-bold text-primary">{moves}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Matches</p>
                <p className="text-3xl font-bold text-secondary">{matches}/{emojis.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-2xl text-4xl font-bold transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground scale-95"
                      : "bg-muted hover:scale-105 hover:bg-muted/80"
                  } ${card.isMatched ? "opacity-60" : ""}`}
                  disabled={card.isMatched}
                >
                  {card.isFlipped || card.isMatched ? card.emoji : "?"}
                </button>
              ))}
            </div>

            <Button
              onClick={initializeGame}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              New Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Memory;
