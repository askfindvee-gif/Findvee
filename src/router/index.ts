import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";
import { Suspense } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  if (!window.REACT_APP_NAVIGATE) {
    const navigate = useNavigate();
    useEffect(() => {
      window.REACT_APP_NAVIGATE = navigate;
      navigateResolver(window.REACT_APP_NAVIGATE);
    });
  }
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
}
