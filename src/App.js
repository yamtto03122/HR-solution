import './App.css';
import './style/Css.css';
import AuthContext, { AuthContextProvider, useAuthContext } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyle';
import Home from './pages/Home'
import Login from './pages/Login';
import { Navigate, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Nav from './component/Nav';
import "react-quill/dist/quill.snow.css";


function App() {
    const location = useLocation();
    const showNav = location.pathname !== '/login'
  return (
      
        <AuthContextProvider>
        <GlobalStyle />
            {showNav && <Nav/>}
            <Routes>
              <Route path="/" element={
                <ProtectedRoute><Home /></ProtectedRoute>
              } />
              {/* 로그인 성공시 Home페이지로 이동 */}

              <Route path='/login' element={
                <LoginRedirect><Login /></LoginRedirect>
              } />
              
            </Routes>
            <Outlet/>
        </AuthContextProvider>
      
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