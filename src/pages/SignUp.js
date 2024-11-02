import {useState} from 'react'
import axios from 'axios'
import Lottie from 'lottie-react';
import title from '../assets/title.json'; 
import icons from '../assets/icons.json'; 
import { useNavigate } from 'react-router-dom';
const SignUp=()=>{
    const navigate = useNavigate()
    const [username,set_username] = useState("")
    const [password,set_password] = useState("")
    const [confirm_password,set_confirm_password] = useState("")
    
    const initiate_signup=async()=>{
        if((password===confirm_password) && (password!=="" && confirm_password!=="") && (username!=="")){
            const signup_data={
                username:username,
                password:password
            }
            const response = await axios.post("http://localhost:5500/api/signup",signup_data)
            console.log(response.data.message)
            
        }
    }

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
            className="bg-black text-white pt-2 pb-2 pl-4 pr-4 rounded-full bg-opacity-20 border-white border-2"
            onClick={() => { navigate("/signup") }}
        >
            Log In
        </button>
    </div></nav>
        
        <div className="flex justify-center mt-28">
            <div className="drop-shadow-2xl border h-[50vh]">
            <Lottie className="drop-shadow-xl"
            animationData={icons}
            loop={false} 
            autoplay={true}
            style={{ width: '100%', height: '100%' }} 
        />
            </div>

            <div className="border w-2/4 flex flex-col justify-center">
            <div className="flex justify-center">
            <input className="bg-transparent text-center placeholder:text-gray-300 outline-none text-white focus:border-b-2 w-7/12 mb-4" onChange={(e)=>{set_username(e.target.value)}} type="text" placeholder="Username" value={username}></input></div>
            <input onChange={(e)=>{set_password(e.target.value)}} type="password" placeholder="password" value={password}></input><br></br>
            <input onChange={(e)=>{set_confirm_password(e.target.value)}} type="password" placeholder="confirm password" value={confirm_password}></input><br></br>
            <button onClick={initiate_signup}>Sign Up</button>
            </div>

        </div>

        </div>
    )
}
export default SignUp