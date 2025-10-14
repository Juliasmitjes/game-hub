import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RockPaperScissors from "./pages/RockPaperScissors";
import Memory from "./pages/Memory";
import TicTacToe from "./pages/TicTacToe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
  </QueryClientProvider>
);

export default App;
