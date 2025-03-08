import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./providers/ToastProvider.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider />
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>
);
