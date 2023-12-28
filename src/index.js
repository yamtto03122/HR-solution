import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import { BrowserRouter, Navigate, Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Join from './pages/Join';
import Nav from './component/Nav';
import Admin from './pages/Admin';
import Members from './pages/Members';
import Layout from './pages/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

//관리자 인증
// const ProtecRoute = ({checkAdmin, children}) => {
//   const { user } = useAuthContext();
//   if(!user || (checkAdmin && !user.isAdmin)){
//     return <Navigate to='/' replace/>
//   }
// }

// //회원 인증
// const GetHome = (children) => {
//   const { user } = useAuthContext();
//   if(!user){
//     return <Navigate to='/login' replace />
//   }
//   return children;
// }

const routes = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    errorElement : <NotFound/>,

    children : [
      // {path : '/nav', element : <Nav/>}, app.js에서 제외시킬 컴포넌트만 여기 쓰는거다.
      {path : '/join', element : <Join/>},
      {path : '/admin', element : <Admin/>},
      {path : '/', element : <Home/>},
      {path : '/members', element: <Members/>}
    ]
  },
  {path : '/login', element : <Login/>}
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
