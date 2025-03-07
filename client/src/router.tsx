import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AccountProvider } from './providers/account.provider';
import publicRoutes from './routes/public';
import privateRoutes from './routes/private';

const App = () => {
    return (
        <AccountProvider>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <Routes>
                    {[
                        ...publicRoutes,
                        ...privateRoutes
                    ].map((route, index) => (
                        <Route key={ index } path={ route.path } element={ route.component } />
                    ))}
                </Routes>
            </BrowserRouter>
        </AccountProvider>
    )};

export default App;