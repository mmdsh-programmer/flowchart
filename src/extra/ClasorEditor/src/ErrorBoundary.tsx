import React from 'react';
import { getErrorHandler } from './Store';

class ErrorBoundary extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // You can also log the error to an error reporting service
    const handleError = getErrorHandler();
    handleError(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
