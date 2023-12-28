import React from 'react';
import Nav from '../component/Nav';
import { Outlet } from 'react-router-dom';
import GlobalStyle from '../style/GlobalStyle';
import Home from './Home';

function Layout(props) {
    return (
        <>
           <GlobalStyle/>
           <Nav/>
           <Outlet/>
        </>
    );
}

export default Layout;