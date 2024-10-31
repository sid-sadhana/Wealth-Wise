import axios from 'axios'
import React,{useState} from 'react'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5500';

const SignIn=()=>{
    const [username,set_username] = useState("")
    const [password,set_password] = useState("")


    const signin_invoke=async()=>{
        const response = await axios.post("http://localhost:5500/api/signin",{"username":username,"password":password})
        console.log(response.data)
    }

    return(
        <div>
            <input type="text" placeholder="username" onChange={(e)=>{set_username(e.target.value)}} value={username}/><br></br>
            <input type="password" placeholder="password" onChange={(e)=>{set_password(e.target.value)}} value={password}/><br></br>
            <button onClick={signin_invoke}>sign in</button>
        </div>
    )
}
export default SignIn