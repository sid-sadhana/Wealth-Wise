import axios from 'axios'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard=()=>{
const navigate = useNavigate()
useEffect(()=>{
    const verifytoken=async()=>{
    const response = await axios.get("/api/get-verify-token")
    if(response.status!==200){
        navigate("/signin")
    }
    }
    verifytoken()
},[])

return(
    <div>
        <h2>Dashboard</h2>
    </div>
)
}
export default Dashboard