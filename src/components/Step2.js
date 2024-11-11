import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Step2 = () => {
    const [first_name,set_first_name] = useState("")
    const [last_name,set_last_name] = useState("")

    return(
        <div className="flex flex-col justify-center">
            <input placeholder="First Name"></input>
            <input placeholder="Last Name"></input>
        </div>
    )
}
export default Step2;
