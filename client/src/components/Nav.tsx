import React from 'react'
import "../index.css"
import { ReactComponent as Bell } from "../assets/bell.svg"
import { generateFromString } from 'generate-avatar'
interface Username{
    username:string
}
const Nav:React.FC<Username>=({username})=>{
return(
<nav className="border border-white w-full h-20 justify-end flex space-x-3 pr-4">
    <button className="bg-white border-opacity-20 bg-opacity-5 h-2/3 rounded-full border-white border mt-2 p-2"><img className="w-[100%] h-[100%]"/><Bell></Bell></button>
    <button className="bg-white border-opacity-20 rounded-full h-2/3 mt-2 border border-white" aria-label={`Profile picture of ${username}`}><img className="h-full w-full rounded-full" src={`data:image/svg+xml;utf8,${generateFromString(username)}`} alt={`Profile picture of ${username}`}/></button>
</nav>
)
}
export default Nav