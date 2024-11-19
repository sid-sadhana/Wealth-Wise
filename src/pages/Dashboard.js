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
<div id="bg2" className="bg-black h-screen w-full">
<div className="flex">
<div className="mt-[10vh] h-[80vh] mb-[10vh] w-16 border-r-2 border-r-white">
<h1 className="text-white ">.</h1>
</div>
<div className="border h-12 w-32 border-red-500">
<h1 className="text-white">.</h1>
</div>
</div>
</div>


)
}
export default Dashboard