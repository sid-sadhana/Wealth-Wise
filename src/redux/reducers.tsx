import { SET_SIGNUP_USERNAME, SET_SIGNUP_PASSWORD } from "./actions";

export interface SignupState {
  username: string;
  password: string;
}

interface Action {
  type: string;
  payload: any;
}

const initial_signup: SignupState = {
  username: "",
  password: "",
};

const signupReducer = (state = initial_signup, action: Action): SignupState => {
  switch (action.type) {
    case SET_SIGNUP_USERNAME:
      return { ...state, username: action.payload };
    case SET_SIGNUP_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default signupReducer;