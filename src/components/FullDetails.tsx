import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {RootState,AppDispatch} from '../redux/store'
import {set_signup_progress} from '../redux/actions'
const FullDetails:React.FC=()=>{
    const dispatch = useDispatch()
    const [fn,set_fn] = useState<string>("");
    const [ln,set_ln] = useState<string>("");
    const progress_from_store = useSelector((state: RootState) => state.progress);
        return(
            <div className="w-full space-y-4">
                
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
                <div className="w-full space-x-2 flex flex-row">
                <button className="w-1/2 bg-black text-white p-2 mt-8 rounded-2xl bg-opacity-50 transition-all duration-300 ease-in-out hover:bg-opacity-60 active:scale-95" onClick={()=>dispatch(set_signup_progress(0))}>Prev</button>
                <button className="w-1/2 bg-black text-white p-2 mt-8 rounded-2xl bg-opacity-50 hover:bg-opacity-60 transition-all duration-300 ease-in-out active:scale-95">Finish</button>
                </div>
            </div>
        )
}
export default FullDetails