import {useState} from 'react'
const Step1=()=>{
    const [fn,set_fn] = useState('')
    const [ln,set_ln] = useState('')

    console.log(fn)
    console.log(ln)

    const export_name=()=>{
        //function to function communication
    }

    return(
        <div>
           <input type="text" onChange={(e)=>{set_fn(e.target.value)}} value={fn} placeholder="First Name"/> 
           <input type="text" onChange={(e)=>{set_ln(e.target.value)}} value={ln} placeholder="Last Name"/> 
        </div>
    )
}
export default Step1