export const SET_SIGNUP_USERNAME = "SET_SIGNUP_USERNAME";
export const SET_SIGNUP_PASSWORD = "SET_SIGNUP_PASSWORD";

export const set_signup_username = (signup_username: string) => {
  return {
    type: SET_SIGNUP_USERNAME,
    payload: signup_username,
  };
};

export const set_signup_password = (signup_password: string) => {
  return {
    type: SET_SIGNUP_PASSWORD,
    payload: signup_password,
  };
};
