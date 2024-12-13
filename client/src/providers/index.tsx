import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
    </ReduxProvider>
  );
}
