import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Update from './Update';
import Read from './Read';
import NotFoundPage from './NotFoundPage';
import NavBar from './NavBar';
import RegisterForm from './RegisterForm';
const RouteWrapperCRUD = () => {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/update/:id" element={<Update/>} />
                    <Route path="/Read/:id" element={<Read/>} />
                    <Route path="/RegisterForm" element={<RegisterForm/>} />
                    <Route path="/update/:id" element={<Update/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route />
                </Routes>
            </BrowserRouter>

        </>
    );
}
export default RouteWrapperCRUD;