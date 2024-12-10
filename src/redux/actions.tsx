// redux/actions.ts

// Action Types
export const SET_SIGNUP_USERNAME = 'SET_SIGNUP_USERNAME';

// Action Creators
export interface SetSignUpUsernameAction {
  type: typeof SET_SIGNUP_USERNAME;
  payload: string; // The payload will be the username.
}

export const set_signup_username = (username: string): SetSignUpUsernameAction => ({
  type: SET_SIGNUP_USERNAME,
  payload: username,
});
