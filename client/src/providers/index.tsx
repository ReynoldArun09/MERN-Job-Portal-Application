import ErrorFallback from "@/components/common/error-fallback";
import TopLoader from "@/components/common/top-loader";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<TopLoader />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <BrowserRouter>
              {children}
              <Toaster />
            </BrowserRouter>
          </ReduxProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
