import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './MainBody/NavBar';

const RootPage = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootPage;