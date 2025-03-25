import { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: string;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true, error: _.message };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (<h1>Something went wrong: {this.state.error}</h1>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;