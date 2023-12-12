import './App.css';
import AuthContext, { AuthContextProvider, useAuthContext } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyle';
import Home from './pages/Home'
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './component/Nav';
import { useContext } from 'react';

const queryClient = new QueryClient();

// // 회원 인증
// const GetHome = () => {
//   const { user } = useAuthContext();
//   if(!user){
//     return <Navigate to='/login' replace />
//   }
//   return <Navigate to='/' />;
// }

//               {/* 로그인 성공시에만 메인페이지로 이동 */}
//             </Routes>
//         </AuthContextProvider>
//       </QueryClientProvider>
//     </>
//   );
// }



function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AuthContextProvider>
          <Outlet/>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
            {/* 로그인 성공시 Home페이지로 이동 */}

            <Route path='/login' element={
              <LoginRedirect><Login /></LoginRedirect>
            } />
            
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (!user) { //만약 유저가 없다면
    return <Navigate to="/login" />; //로그인페이지로 돌아가라
  }
  return children; //그렇지 않으면 자식요소 <Home />을 반환해라
}

function LoginRedirect({ children }) {
  const { user } = useAuthContext();
  if (user) { //만약 유저가 있다면
    return <Navigate to="/" />; //app을 출력해라
  }
  return children; //그렇지 않으면 자식요소 <Login />을 반환해라
}

// function PrivateRoute({children}){
//   const {isLogin} = useAuthContext();
//   console.log(isLogin)

//   if(!isLogin){
//     return <Navigate to="/login" />; 
//   }
//   return children
// }

export default App;