import '../styles/Home.css';
import Lottie from 'lottie-react';
import title from '../assets/title.json'; 
import subtitle from '../assets/subtitle.json'; 
import {useNavigate} from 'react-router-dom'
import calendar from '../assets/calendar.png';
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
            className="bg-[#6d6aaa] text-white pt-2 pb-2 pl-4 pr-4 rounded-full bg-opacity-50"
            onClick={() => { navigate("/signup") }}
        >
            Sign Up
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
        <button className="mt-16 text-white border-white text-lg bg-black bg-opacity-30 p-3 rounded-full">
            Get Started
        </button>    
    </div>
</div>

            </div>
    )
}
export default Home