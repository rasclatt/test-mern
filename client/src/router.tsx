import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AccountProvider } from './providers/account.provider';
import publicRoutes from './routes/public';
import privateRoutes from './routes/private';
import adminRoutes from './routes/admin';
import ModalProvider from './components/modal/provider';
import ErrorBoundary from './components/infrastructure/error-boundary';

const App = () => {
    return (
        <ErrorBoundary>
            <AccountProvider>
                <ModalProvider>
                    <BrowserRouter
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true
                        }}
                    >
                        <Routes>
                            {[
                                ...publicRoutes,
                                ...privateRoutes,
                                ...adminRoutes
                            ].map((route, index) => (
                                <Route key={ index } path={ route.path } element={ route.component } />
                            ))}
                        </Routes>
                    </BrowserRouter>
                </ModalProvider>
            </AccountProvider>
        </ErrorBoundary>
    )};

export default App;