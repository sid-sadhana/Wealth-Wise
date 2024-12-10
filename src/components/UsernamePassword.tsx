import { useDispatch, useSelector } from 'react-redux';
import { setSignUpUsername } from '../redux/reducers';
import {useState} from 'react'
import { AppDispatch ,RootState} from '../redux/store';
const UsernamePassword: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
  const [username, set_username] = useState<string>('');
  const [pass, set_pass] = useState<string>('');
  const [confirm_pass, set_confirm_pass] = useState<string>('');
  const [pass_eye, set_pass_eye] = useState<boolean>(true);
  const [confirm_eye, set_confirm_eye] = useState<boolean>(true);

  // Function to handle username change
  const handleUsernameChange = () => {
    dispatch(setSignUpUsername(username)); // Dispatch the action to set the username
  };
  const currentUsername = useSelector((state: RootState) => state.signUp.username); // Access username from Redux state
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => set_username(e.target.value)}
        className="w-full outline-none text-white text-center border-none rounded-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-white focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
      />

      

      <div className="flex flex-row w-full justify-center">
        <input
          type={pass_eye ? "password" : "text"}
          onChange={(e) => set_pass(e.target.value)}
          value={pass}
          placeholder="Password"
          className="placeholder:pl-10 w-full outline-none text-white text-center border-none rounded-l-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
        />
        {pass_eye && (
          <button
            className="p-2 rounded-r-2xl bg-white bg-opacity-[3%] shadow drop-shadow"
            onClick={() => set_pass_eye(!pass_eye)}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              {/* SVG code for eye icon */}
            </svg>
          </button>
        )}
        {!pass_eye && (
          <button
            className="p-2 rounded-r-2xl bg-white bg-opacity-[3%] shadow drop-shadow"
            onClick={() => set_pass_eye(!pass_eye)}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              {/* SVG code for eye-off icon */}
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-row w-full justify-center">
        <input
          type={confirm_eye ? "password" : "text"}
          onChange={(e) => set_confirm_pass(e.target.value)}
          value={confirm_pass}
          placeholder="Confirm Password"
          className="placeholder:pl-10 w-full outline-none text-white text-center border-none rounded-l-2xl transition-all duration-300 bg-white bg-opacity-[3%] p-2 focus:bg-opacity-5 focus:drop-shadow-2xl focus:shadow-2xl drop-shadow shadow placeholder:text-gray-300 ease-in-out"
        />
        {confirm_eye && (
          <button
            className="p-2 rounded-r-2xl bg-white bg-opacity-[3%] shadow drop-shadow"
            onClick={() => set_confirm_eye(!confirm_eye)}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              {/* SVG code for eye icon */}
            </svg>
          </button>
        )}
        {!confirm_eye && (
          <button
            className="p-2 rounded-r-2xl bg-white bg-opacity-[3%] shadow drop-shadow"
            onClick={() => set_confirm_eye(!confirm_eye)}
          >
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              {/* SVG code for eye-off icon */}
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={handleUsernameChange} // Trigger the action on click
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Set Username
      </button>
      <h2>{currentUsername}</h2>
    </div>
  );
};

export default UsernamePassword;
