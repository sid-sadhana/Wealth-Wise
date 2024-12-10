import {useState} from 'react'
const FullDetails:React.FC=()=>{
    const [fn,set_fn] = useState<string>("");
    const [ln,set_ln] = useState<string>("");
        return(
            <div className="w-full">
                <input
                    type="text"
                    onChange={(e) => { set_fn(e.target.value); }}
                    value={fn}
                    placeholder="First Name"
                    className="w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
                />
                <input
                    type="text"
                    onChange={(e) => { set_ln(e.target.value); }}
                    value={ln}
                    placeholder="Last Name"
                    className="w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
                />
            </div>
        )
}
export default FullDetails