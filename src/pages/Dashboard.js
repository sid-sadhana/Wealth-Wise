import axios from 'axios'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "../index.css"
const Dashboard=()=>{
const navigate = useNavigate()
useEffect(()=>{
    const verifytoken=async()=>{
    const response = await axios.get("http://localhost:5500/api/get-verify-token")
    if(response.status!==200){
        navigate("/signin")
    }
    }
    verifytoken()
},[])

return(
    <div className="w-full bg-black">
    <div id="bg2">
        <h2>Dashboard</h2>
    </div>
    </div>
)
}
export default Dashboard