import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RockPaperScissors from "./pages/RockPaperScissors";
import RPS from './pages/Rps';
import Memory from "./pages/Memory";
import TicTacToe from "./pages/TicTacToe";
import NotFound from "./pages/NotFound";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/rps" element={<RPS />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
