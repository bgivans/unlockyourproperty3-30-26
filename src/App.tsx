import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToHash from "./components/ScrollToHash.tsx";
import ViewTracker from "./components/ViewTracker.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import SiteLayout from "./components/SiteLayout.tsx";
import Index from "./pages/Index.tsx";
import FixDevelop from "./pages/FixDevelop.tsx";
import RealEstateMoves from "./pages/RealEstateMoves.tsx";
import AduFeasibility from "./pages/AduFeasibility.tsx";
import CodeViolationGuide from "./pages/CodeViolationGuide.tsx";
import ProbateGuide from "./pages/ProbateGuide.tsx";
import Buy from "./pages/Buy.tsx";
import About from "./pages/About.tsx";
import Probate from "./pages/Probate.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <ViewTracker />
          <Routes>
            <Route path="/" element={<SiteLayout><Index /></SiteLayout>} />
            <Route path="/solutions/fix-develop" element={<SiteLayout><FixDevelop /></SiteLayout>} />
            <Route path="/solutions/real-estate-moves" element={<SiteLayout><RealEstateMoves /></SiteLayout>} />
            <Route path="/buy" element={<SiteLayout><Buy /></SiteLayout>} />
            <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
            <Route path="/probate" element={<SiteLayout><Probate /></SiteLayout>} />
            <Route path="/lp/adu-feasibility" element={<AduFeasibility />} />
            <Route path="/lp/code-violation-guide" element={<CodeViolationGuide />} />
            <Route path="/lp/probate-guide" element={<ProbateGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
