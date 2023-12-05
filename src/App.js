import './App.css';
import AuthContext, { AuthContextProvider, useAuthContext } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyle';
import Home from './pages/Home'
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './component/Nav';

const queryClient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
          <GlobalStyle/>
        <AuthContextProvider>
          <Routes>
            <Route path='/home' element={<Home/>}> //중첩 라우팅
            </Route>
            <Route path='/login' element={<Login/>}/>
            {/* 로그인 성공시 Home페이지로 이동 */}
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
