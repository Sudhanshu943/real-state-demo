import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('AppErrorBoundary caught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F4F0E8',
          color: '#18221F',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '36px', marginBottom: '16px' }}>
            AUREL
          </h1>
          <p style={{ maxWidth: '480px', marginBottom: '24px', color: '#58625B' }}>
            An unexpected error occurred while loading this view. You can return to the homepage or reload the experience.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.hash = '#/';
              window.location.reload();
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28463C',
              color: '#FFFFFF',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            Return to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
