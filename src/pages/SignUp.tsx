import { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import title from '../assets/title.json'; 
// import icons from '../assets/woman2.json'; 
// import icons from '../assets/man2.json'; 
import icons from '../assets/man3.json'; 
import { useNavigate } from 'react-router-dom';
// import MultiStep from '../components/MultiStep';
// import Step1 from '../components/Step1'
// import Step2 from '../components/Step2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsernamePassword from '../components/UsernamePassword'
import FullDetails from '../components/FullDetails'

const SignUp:React.FC = () => {
    const navigate = useNavigate();

    const [progress_state,set_progress_state] = useState<number>(0);

    return (
        <div id="bg">
            <ToastContainer/>
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
                        onClick={() => { navigate("/signin") }}
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
                    {progress_state <50 && <UsernamePassword/>}
                    {progress_state >=50 && <FullDetails/>}
                </div>

            </div>
        </div>
    );
}

export default SignUp;
