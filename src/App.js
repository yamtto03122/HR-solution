import './App.css';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyle';
import Home from './pages/Home'
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle/>
          <BrowserRouter>
              <Login/>
            <Routes>
              <Route path='/pages' element={<Home/>}/>
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
