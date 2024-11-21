import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../index.css"
import Bell from "../assets/bell.svg"
import { generateFromString } from 'generate-avatar'
const Nav=({username})=>{
return(
<nav className="border border-white w-full h-20 justify-end flex space-x-3 pr-4 pt-2">
    <button className="bg-white border-opacity-20 bg-opacity-5 h-2/3 rounded-full border-white border mt-4 p-2"><img className="w-[100%] h-[100%]" src={Bell}/></button>
    <button className="bg-white border-opacity-20 rounded-full h-2/3 mt-4 border border-white" aria-label={`Profile picture of ${username}`}><img className="h-full w-full rounded-full" src={`data:image/svg+xml;utf8,${generateFromString(username)}`} alt={`Profile picture of ${username}`}/></button>
</nav>
)
}
export default Nav