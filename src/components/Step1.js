import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Step1 = ({ send_to_parent1 }) => {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [confirm_password, set_confirm_password] = useState('');

    const check_username_password = async () => {
        if (confirm_password !== password) {
            toast("Passwords do not match!");
            return true;
        }

        if (password === "" || username === "") {
            toast("Username and Password cannot be empty.");
            return true;
        }

        const response = await axios.post("/api/check-password", { password });
        if (response.status === 201) {
            switch (response.data) {
                case "error1":
                    toast("Password must contain at least 8 characters.");
                    break;
                case "error2":
                    toast("Password must contain at least one lowercase letter.");
                    break;
                case "error3":
                    toast("Password must contain at least one uppercase letter.");
                    break;
                case "error4":
                    toast("Password must contain at least one number.");
                    break;
                case "error5":
                    toast("Password must contain at least one special character.");
                    break;
                case "error6":
                    toast("Password cannot contain spaces.");
                    break;
                case "error8":
                    toast("Password contains invalid characters. Only letters, numbers, and allowed symbols are allowed.");
                    break;
                default:
                    toast("Something went wrong");
            }
            return true;
        }

        const username_response = await axios.post("/api/check-username", { username });
        if(username_response.status===201){
            toast("Username contains invalid characters. Only letters, numbers, and one underscore are allowed.")
            return true
        }
        if (username_response.data === true) {
            toast("Username already taken!");
            return true;
        }
        return false;
    };

    const export_name = async () => {
        var username_check = await check_username_password();
        if (username_check === false) {
            const data = { username: username, password: password, progress_state: "50" };
            send_to_parent1(data);
        }
    };

    return (
        <div className="flex flex-col mt-12 w-full items-center text-lg space-y-8">
    <ToastContainer />
        {/* Username Input */}
        <div className="relative w-8/12 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent to-transparent rounded-2xl opacity-60 group-focus:opacity-75 transition duration-300 blur-sm"></div>
            <input
                type="text"
                onChange={(e) => { set_username(e.target.value); }}
                value={username}
                placeholder="Username"
                className="relative w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
            />
        </div>

        {/* Password Input */}
        <div className="relative w-8/12 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent to-transparent rounded-2xl opacity-60 group-focus:opacity-75 transition duration-300 blur-sm"></div>
            <input
                type="password"
                onChange={(e) => { set_password(e.target.value); }}
                value={password}
                placeholder="Password"
                className="relative w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
            />
        </div>

        {/* Confirm Password Input */}
        <div className="relative w-8/12 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent to-transparent rounded-2xl opacity-60 group-focus:opacity-75 transition duration-300 blur-sm"></div>
            <input
                type="password"
                onChange={(e) => { set_confirm_password(e.target.value); }}
                value={confirm_password}
                placeholder="Confirm Password"
                className="relative w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
            />
        </div>
        <button className="bg-black w-8/12 text-white p-2 bg-opacity-30 rounded-full border-black border drop-shadow shadow hover:bg-opacity-40 transition-all duration-300 ease-in-out" onClick={export_name}>Next</button>
</div>
    );
};

export default Step1;
