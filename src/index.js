import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Play from './Play';
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/play" element={<Play/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>}/>
    </Routes>
    </BrowserRouter>
);