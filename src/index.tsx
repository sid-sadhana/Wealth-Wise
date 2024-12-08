import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home'
// import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
// import Dashboard from '../pages/Dashboard'
// import Track from '../pages/Track'
// import Holdings from '../pages/Holdings'
// import Settings from '../pages/Settings'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track" element={<Track />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/settings" element={<Settings />} /> */}
        </Routes>
    </BrowserRouter>
);
