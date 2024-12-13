import { SET_SIGNUP_USERNAME, SET_SIGNUP_PASSWORD ,SET_SIGNUP_PROGRESS} from "./actions";

export interface SignupState {
  username: string;
  password: string;
  progress:number
}

interface Action {
  type: string;
  payload: any;
}

const initial_signup: SignupState = {
  username: "",
  password: "",
  progress:0
};

const signupReducer = (state = initial_signup, action: Action): SignupState => {
  switch (action.type) {
    case SET_SIGNUP_USERNAME:
      return { ...state, username: action.payload };
    case SET_SIGNUP_PASSWORD:
      return { ...state, password: action.payload };
    case SET_SIGNUP_PROGRESS:
      return { ...state, progress: action.payload };  
    default:
      return state;
  }
};

export default signupReducer;