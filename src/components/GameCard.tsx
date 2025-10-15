import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
}

const GameCard = ({ title, description, icon: Icon, path, gradient }: GameCardProps) => {
  return (
    <Link to={path} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-game)] bg-primary/20 backdrop-blur-sm">
        <CardContent className="p-8">
          <div 
            className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: gradient }}
          >
            <Icon className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameCard;
