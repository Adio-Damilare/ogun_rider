import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HeroUIProvider} from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "@/providers/ToastProvider.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider />
      < HeroUIProvider >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
