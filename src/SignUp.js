import {useState,useEffect} from 'react'
import axios from 'axios'
const SignUp=()=>{

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
        <div>
            <input onChange={(e)=>{set_username(e.target.value)}} type="text" placeholder="username" value={username}></input><br></br>
            <input onChange={(e)=>{set_password(e.target.value)}} type="password" placeholder="password" value={password}></input><br></br>
            <input onChange={(e)=>{set_confirm_password(e.target.value)}} type="password" placeholder="confirm password" value={confirm_password}></input><br></br>
            <button onClick={initiate_signup}>Sign Up</button>
        </div>
    )
}
export default SignUp