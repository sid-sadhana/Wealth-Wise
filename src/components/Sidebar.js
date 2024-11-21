import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../index.css"
import Graph from "../assets/graph.svg"
import Home from "../assets/home.svg"
import Holding from "../assets/holding.svg"
import Setting from "../assets/setting.svg"
import Nav from "../components/Nav"
const Sidebar=({children})=>{
const navigate = useNavigate()
const [username,set_username]=useState("")
useEffect(()=>{
    const verifytoken=async()=>{
    const response = await axios.get("http://localhost:5500/api/get-verify-token")
    if(response.status!==200){
        navigate("/signin")
    }
    else if(response.status===200){
        //console.log(response.data.token.username);
        set_username(response.data.token.username)
    }
    }
    verifytoken()
},[])
return(
<div className="bg-black h-screen w-full" id="bg2">
<div className="flex h-screen">
<div className="h-screen w-20 border-r-2 border-r-gray-300">
    <div className="space-y-8 items-center flex flex-col p-4 mt-36">
        <button onClick={()=>{navigate("/dashboard")}} className="border border-white p-2 rounded-lg border-opacity-20 bg-white bg-opacity-5"><img className="w-[100%] h-[100%]" src={Home}/></button>
        <button onClick={()=>{navigate("/track")}} className="border border-white p-1.5 rounded-lg border-opacity-20 bg-white bg-opacity-5"><img className="w-[100%] h-[100%]" src={Graph}/></button>
        <button onClick={()=>{navigate("/holdings")}} className="border border-white p-1.5 rounded-lg border-opacity-20 bg-white bg-opacity-5"><img className="w-[100%] h-[100%]" src={Holding}/></button>
        <button onClick={()=>{navigate("/settings")}} className="border border-white p-1.5 rounded-lg border-opacity-20 bg-white bg-opacity-5"><img className="w-[100%] h-[100%]" src={Setting}/></button>
    </div>
</div>
<div className="flex flex-col w-full h-full">
    <Nav username={username}/>
    {children}
</div>
</div>
</div>


)
}
export default Sidebar