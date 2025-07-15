import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRequest from "./pages/CreateRequest";
import WaitingResponse from "./pages/WaitingResponse";
import Quotes from "./pages/Quotes";
import JobTracking from "./pages/JobTracking";
import MyRequests from "./pages/MyRequests";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerRequests from "./pages/WorkerRequests";
import SendQuote from "./pages/SendQuote";
import WorkerJobs from "./pages/WorkerJobs";
import Profile from "./pages/Profile";
import WorkerProfile from "./pages/WorkerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/waiting-response" element={<WaitingResponse />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/job-tracking" element={<JobTracking />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/worker-requests" element={<WorkerRequests />} />
          <Route path="/send-quote" element={<SendQuote />} />
          <Route path="/worker-jobs" element={<WorkerJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/worker-profile" element={<WorkerProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;