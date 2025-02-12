import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/homepage';
import SignInComponent from './components/permission/sign-in';
import { AccountProvider } from './providers/account.provider';

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
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/sign-in" element={ <SignInComponent redirect='/'></SignInComponent> } />
                </Routes>
            </BrowserRouter>
        </AccountProvider>
    )};

export default App;