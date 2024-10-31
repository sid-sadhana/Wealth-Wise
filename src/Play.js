import React,{useState,useEffect} from 'react'
import COne from './components/COne.js'
const Play=()=>{
  const [click_text,set_click_text]=useState('')
  const [type_text,set_type_text]=useState('')
  useEffect(()=>{
    set_click_text("effect test")
  },[])
  const [visible,set_visible]=useState(null)
  const toggle_render=()=>{
    if(visible===null)
      set_visible(true)
    else{
      set_visible(!visible)
    }
  }

  return(
    <div className="font-mono bg-black text-white w-screen h-screen">
      <h1>hello world</h1>
      <h1>i clicked - {click_text}</h1>
      <button onClick={()=>{if(click_text===""){set_click_text("*click click*")}else set_click_text("")}}className="border-white border-2 p-4 mt-12">click me</button>
      <h1>i typed - {type_text}</h1>
      <input placeholder="type here" className="bg-black text-white" onChange={(e)=>{set_type_text(e.target.value)}}></input>
      <COne/>
      <COne/>
      <COne/>
      <button onClick={toggle_render} className="border-2 border-white p-4">Conditionally Render</button>
      {visible && <h1>conditionally rendering this hahaha</h1>}
    </div>
  )
}
export default Play;