import React from 'react';
import Nav from '../component/Nav';
import { Route, Routes } from 'react-router-dom';
import TabMenu from '../component/TabMenu';
import Notice from './Notice';

function Home() {
    return (
        <>
            <div className='rightSection'>
                    <TabMenu/>
                <div className='container'>
                    <Notice/>
                </div>
            </div>
            

        </>
    );
}

export default Home;