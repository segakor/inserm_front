import { Component, ReactNode } from 'react';
import { ErrorComponent } from './ErrorComponent';

type ErrorProps = { children: ReactNode };
type ErrorState = { hasError: boolean; errorMessage: string };

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
    constructor(props: ErrorProps) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    public static getDerivedStateFromError(err: Error): ErrorState {
        return { hasError: true, errorMessage: err.message || 'Повторите попытку' };
    }

    render(): ReactNode {
        if (!this.state.hasError) return this.props.children;

        return <ErrorComponent errMessage={this.state.errorMessage} />;
    }
}

export default ErrorBoundary;
