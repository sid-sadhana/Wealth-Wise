import {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Step1=({send_to_parent1})=>{
    const [username,set_username] = useState('')
    const [password,set_password] = useState('')
    const [confirm_password,set_confirm_password] = useState('')
    

    const check_username_password=async()=>{
        if(confirm_password!==password){
            toast("Passwords do not match!")
        }
        else if(confirm_password===password){
            if (
                password.length < 8 ||               
                !/[a-z]/.test(password) ||           
                !/[A-Z]/.test(password) ||           
                !/\d/.test(password) ||              
                !/[!@#$%^&*(),.?":{}|<>\[\]]/.test(password)
              ){
                toast("Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*,.?\":{}|<>\[\])")
            }
            else{
                const response = await axios.post("/api/check-username",{username})
                if(response.data==true){
                    toast("Username already taken!")
                    return true
                }
                else{
                    return false
                }
            }
        }
    }

    const export_name=async()=>{
        var username_check=await check_username_password()
        console.log(username_check)
        if(username_check===false){
        const data={username:username,password:password,progress_state:"50"}
        send_to_parent1(data)
        console.log("ran export_name")
        }
    }

    return(
        <div className="flex flex-col justify-center">
            <ToastContainer/>
           <input type="text" onChange={(e)=>{set_username(e.target.value)}} value={username} placeholder="Username"/> 
           <input type="password" onChange={(e)=>{set_password(e.target.value)}} value={password} placeholder="Password"/> 
           <input type="password" onChange={(e)=>{set_confirm_password(e.target.value)}} value={confirm_password} placeholder="Confirm Password"/> 
           <button onClick={export_name}>Next</button>
        </div>
    )
}
export default Step1