import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Step1 = ({ send_to_parent2 }) => {
    const [fn, set_fn] = useState('');
    const [ln, set_ln] = useState('');

    const export_name = () => {
        const data={first_name:fn,last_name:ln,progress_state:"100"}
        send_to_parent2(data)
    };

    const go_back=()=>{
        const data={first_name:"",last_name:"",progress_state:"0"}
        send_to_parent2(data)
    }

    return (
        <div className="flex flex-col mt-12 w-full items-center text-lg space-y-8">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="w-8/12">
                <div className="-inset-0.5 bg-gradient-to-r from-transparent to-transparent rounded-2xl opacity-60 group-focus:opacity-75 transition duration-300 blur-sm"></div>
                <input
                    type="text"
                    onChange={(e) => { set_fn(e.target.value); }}
                    value={fn}
                    placeholder="First Name"
                    className="w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
                />
            </div>

            <div className="w-8/12">
                <div className="-inset-0.5 bg-gradient-to-r from-transparent to-transparent rounded-2xl opacity-60 group-focus:opacity-75 transition duration-300 blur-sm"></div>
                <input
                    type="text"
                    onChange={(e) => { set_ln(e.target.value); }}
                    value={ln}
                    placeholder="Last Name"
                    className="w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
                />
            </div>
            <div className="w-full flex flex-row justify-center gap-28">
            <button className="bg-black w-3/12 text-white p-2 bg-opacity-30 rounded-full border-black border drop-shadow shadow hover:bg-opacity-40 transition-all duration-300 ease-in-out" onClick={go_back}>Back</button>
            <button className="bg-black w-3/12 text-white p-2 bg-opacity-30 rounded-full border-black border drop-shadow shadow hover:bg-opacity-40 transition-all duration-300 ease-in-out" onClick={export_name}>Finish</button>
            </div>
        </div>
    );
};

export default Step1;
