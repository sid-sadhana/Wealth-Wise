import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Play, Home, SignUp, SignIn, Dashboard ,Track,Holdings, Settings} from './route-import/route-import.js';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/play" element={<Play/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/track" element={<Track/>}/>
        <Route path="/holdings" element={<Holdings/>}/>
        <Route path="/settings" element={<Settings/>}/>
    </Routes>
    </BrowserRouter>
);