import '../styles/Home.css';
import React from 'react'
import Lottie from 'lottie-react';
import title from '../assets/title.json'; 
import subtitle from '../assets/subtitle.json'; 

import {useNavigate} from 'react-router-dom'
const Home=()=>{
    const navigate=useNavigate()
    return(
        <div id="bg">
            <nav className="flex justify-between items-center m-8">
    <div className="h-8">
        <Lottie
            animationData={title}
            loop={false} 
            autoplay={true}
            style={{ width: '100%', height: '100%' }} 
        />
    </div>
    <div className="flex items-center">
        <button 
            className="pt-2 pb-2 pr-4 pl-4 text-white mr-8"
            onClick={() => { navigate("/signin") }}
        >
            Log In
        </button>
        <button 
            className="bg-black text-white pt-2 pb-2 pl-4 pr-4 rounded-full bg-opacity-10 border-white border-2"
            onClick={() => { navigate("/signup") }}
        >
            <p>Sign Up</p>
        </button>
    </div>
</nav>
<div className="flex flex-col justify-center items-center mt-40">
    <div className="h-32">
        <Lottie
            animationData={subtitle}
            loop={false} 
            autoplay={true} 
            style={{ width: '100%', height: '100%' }}
        />
    </div>
    <div>
        <button onClick={()=>{navigate('/signup')}} className="border mt-16 text-white border-black text-lg bg-black bg-opacity-30 p-3 rounded-full hover:drop-shadow-lg hover:shadow-lg drop-shadow shadow transition-all duration-300 ease-in-out">
            <p className="font-mono">Get Started</p>
        </button>    
    </div>
</div>        
            </div>
    )
}
export default Home