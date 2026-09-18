---
name: react-error-boundaries
description: Use when implementing granular error containment in React applications, fallback UI, error reporting service integration, and error recovery.
---

# React Error Boundaries & Failure Containment

Uncaught JavaScript exceptions in a React component unmount the entire application component tree, leaving the user with a blank white screen. Error boundaries catch errors, render graceful fallbacks, and report stack traces to observability platforms.

---

## 1. Reusable Class Error Boundary Component

```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    // Send to external error tracker (Sentry, Datadog)
    this.props.onError?.(error, errorInfo);
  }

  public resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.resetErrorBoundary);
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 max-w-md mx-auto my-8 border border-red-200 bg-red-50 rounded-xl text-red-900">
          <h3 className="text-lg font-bold">Something went wrong</h3>
          <p className="text-sm mt-1 text-red-700">{this.state.error.message}</p>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 2. Granular Containment Strategy
- **Root Level**: Wrap the entire application in a global boundary to catch unexpected boot crashes.
- **Widget / Feature Level**: Wrap independent dashboard widgets, chat panes, or sidebars individually so that a single widget failure does not take down the surrounding page.
