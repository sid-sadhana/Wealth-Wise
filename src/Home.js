import {useNavigate} from 'react-router-dom'
const Home=()=>{
    const navigate=useNavigate()
    return(
        <div>
            <h1>WW</h1><br></br>
            <button onClick={()=>{navigate("/signup")}}>Sign Up</button><br></br>
            <button onClick={()=>{navigate("/signin")}}>Already have an account ?</button>
        </div>
    )
}
export default Home