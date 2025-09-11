import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO: wire to logging later
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-4 text-red-700 bg-red-50 border border-red-200 rounded">
          <p className="font-semibold">Something went wrong.</p>
          <p className="text-sm">Please refresh the page and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

