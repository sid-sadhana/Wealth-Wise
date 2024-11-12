import { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import title from '../assets/title.json'; 
// import icons from '../assets/woman2.json'; 
// import icons from '../assets/man2.json'; 
import icons from '../assets/man3.json'; 
import { useNavigate } from 'react-router-dom';
import MultiStep from '../components/MultiStep';
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'

const SignUp = () => {
    const navigate = useNavigate();
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    
    const [first_name,set_first_name] = useState("");
    const [last_name,set_last_name] = useState("");

    const [progress_state,set_progress_state] = useState("0");

    const handle_cred=(data)=>{
        set_username(data.username)
        set_password(data.password)
        set_progress_state(data.progress_state)
        console.log(progress_state)
    }

    const handle_name=(data)=>{
        set_first_name(data.first_name)
        set_last_name(data.last_name)
        set_progress_state(data.progress_state)
        console.log(progress_state)
    }

    const initiate_signup = async () => {
        if (username !== ""){
            const signup_data = {
                username: username,
                password: password
            };
            const response = await axios.post("http://localhost:5500/api/signup", signup_data);
            console.log(response.data.message);
        }
    };

    return (
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
                </div>
            </nav>
        
            <div className="flex justify-center mt-24 gap-16">
                <div className="drop-shadow-2xl h-[60vh]">
                    <Lottie className="drop-shadow-2xl"
                        animationData={icons}
                        loop={true} 
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }} 
                    />
                </div>

                <div className="w-2/4 flex flex-col items-center justify-center mb-24">
                    <MultiStep className="w-[95%] bg-transparent h-1" total="w-[95%] bg-transparent rounded-full h-1" progress={progress_state} />
                    {progress_state<50 && <Step1 send_to_parent1={handle_cred} username={username} password={password}/>}
                    {progress_state>=50 && <Step2 send_to_parent2={handle_name}/>}
                </div>

            </div>
        </div>
    );
}

export default SignUp;
