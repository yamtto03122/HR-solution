import React from 'react';
import Nav from '../component/Nav';
import { Route, Routes } from 'react-router-dom';
import TabMenu from '../component/TabMenu';

function Home() {
    return (
        <>
            {/* <Nav/> */}
            <div className='rightSection'>
                <div className='container'>
                    <TabMenu/>
                </div>
            </div>
            

        </>
    );
}

export default Home;